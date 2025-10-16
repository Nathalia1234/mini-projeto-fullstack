curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"email": "teste1@email.com", "password": "senhaErrada"}'
