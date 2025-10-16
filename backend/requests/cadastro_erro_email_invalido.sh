curl -X POST http://localhost:3000/api/register \
-H "Content-Type: application/json" \
-d '{"name": "Teste3", "email": "emailinvalido", "password": "123456"}'
