const jwt = require("jsonwebtoken");
const secret_key =
  "oiebvgebvjebvkjbekvjebvklsbvkljebkjebvkjebvkjebvjkvbkjbvuibuiewbvjebvkjsyuVFRTWVWV33R5RF263GR82WCOIGVH389 4 ";
const token =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmlkLndpbHNvbkBleGFtcGxlLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDhUMDI6Mzc6MzQuODExWiIsImlhdCI6MTcwNDY4MTQ1NCwiZXhwIjoxNzA3MjczNDU0fQ.tJSKLdWdMtWMQ4KAfeBaIicQ7UiHAv3GjqWbQvytiA8";
console.log(jwt.verify(token.split(" ")[1], secret_key));
