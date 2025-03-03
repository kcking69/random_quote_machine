import { useEffect, useState } from 'react';

const API_URL = 'https://api.quotable.io/quotes/random';

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const getQuote = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setQuotes(data);
    console.log(data, data.author);
  };
  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      <div className='quote-container'>
        <wrapper id='quote-box'>
          {quotes.map((quote) => (
            <>
              <p key={quote.id} className='text' id='text'>
                {quote.content}
              </p>
              <p key={quote.id} className='author' id='author'>
                {quote.author}
              </p>
            </>
          ))}
          <div className='buttons'>
            <button id='new-quote' onClick={setQuotes}>
              New Quote
            </button>
            <a
              id='tweet-quote'
              href='https://twitter.com/intent/tweet'
              target='_blank'
            >
              <button>Tweet Quote</button>
            </a>
          </div>
        </wrapper>
      </div>
    </>
  );
};

export default App;
