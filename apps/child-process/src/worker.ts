process.on('message', (message) => {
  console.log(`Primary: ${message}`);
});

setTimeout(() => {
  process.send?.("Hello Primary. I'm Worker.");
}, 5000);
