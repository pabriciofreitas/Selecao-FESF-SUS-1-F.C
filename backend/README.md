# Backend (FastAPI + SQLAlchemy)

## Setup

1. Criar ambiente virtual:

```powershell
python -m venv .venv
```

2. Ativar ambiente virtual (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

3. Instalar dependências:

```powershell
pip install -r requirements.txt
```

4. Rodar a API:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- GET `/api/contatos`
- POST `/api/auth/google`
- GET `/health`
