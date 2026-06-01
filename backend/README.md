# Backend (FastAPI + SQLAlchemy)

## Requisitos

- Python **3.14.0 ou superior**
- Pip atualizado

Verifique sua versão do Python:

```powershell
python --version
```

Caso a versão seja inferior à 3.14.0, atualize o Python antes de prosseguir.

## Setup

1. Criar ambiente virtual:

```powershell
python -m venv .venv
```

2. Ativar ambiente virtual (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

3. Atualizar o pip:

```powershell
python -m pip install --upgrade pip
```

4. Instalar dependências:

```powershell
pip install -r requirements.txt
```

5. Rodar a API:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- GET `/api/contatos`
- POST `/api/auth/google`
- GET `/health`

> **Importante:** Este projeto requer **Python 3.14.0 ou superior**.