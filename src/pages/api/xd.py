from httpx import AsyncClient

async def hello(request):
    return { "message": "Hello, World" }