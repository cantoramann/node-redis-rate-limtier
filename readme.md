# Node.js Rate Limiter

A browser-based rate limiter and short-term log storage for Node.js. The rate limiter uses the sliding window log algorithm. Writes and reads are both constant time ~O(1), but in return, the limiter does not send the `RATE_LIMIT_REMAINING_HEADER`.

## Features

- Uses the sliding window log algorithm.

- Reads and writes are constant time ~O(1). However, the rate limiter cannot correctly set the `X-RateLimit-Remaining` header. So, depending on the use case, this may not face end-users well.

- Rate limiter is browser based, not IP based. The use case is generally for naive purposes. So, if you want to use this repo to avoid Denial-of-Service attacks, make sure to change Redis keys to implement an IP-specific logic.

- Note that this repo is mostly written for development environments and research purposes.

- Blocked requests are added as new logs to Redis but not extend the lifetime of the HTTP cookie (browser-specific hash). This is use case specific and can be changed.

## Installation & Usage

Make sure you have Node.js installed. If you do not have a local Redis installed, you can connect to your cloud instance, or simply install Redis.

If you are using Redis cloud, make sure to change the connection string in `/src/lib/redis.js`. If you do not want to enter a string in the app, you can use `src/config/index.js`.

After cloning, installation and run commands are simply

```javascript
npm install
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
