import React, { useState, useEffect } from 'react';

function QuoteMachine() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchNewQuote();
  }, []);

  const fetchNewQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to fetch quote.');
      setAuthor('Unknown');
    }
  };

  const tweetQuote = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `"${quote}" - ${author}`
      )}`,
      '_blank'
    );
  };

  return (
    <div
      id='quote-box'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          width: '500px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <div id='text'>{quote}</div>
        <div id='author'>- {author}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <button id='new-quote' onClick={fetchNewQuote}>
            New Quote
          </button>
          <a
            id='tweet-quote'
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote}" - ${author}`
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              tweetQuote(); // Call the tweetQuote function
            }}
          >
            Tweet Quote
          </a>
        </div>
      </div>
    </div>
  );
}

export default QuoteMachine;
