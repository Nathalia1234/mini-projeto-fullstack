curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{
  "email": "naoexiste@emailteste.com",
  "password": "123456"
}'
