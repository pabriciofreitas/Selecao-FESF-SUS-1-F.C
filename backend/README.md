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

1. Criar o arquivo de variaveis de ambiente:

```powershell
Copy-Item .env.example .env
```

2. Criar ambiente virtual:

```powershell
python -m venv .venv
```

3. Ativar ambiente virtual (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

4. Atualizar o pip:

```powershell
python -m pip install --upgrade pip
```

5. Instalar dependências:

```powershell
pip install -r requirements.txt
```

6. Rodar a API:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- GET `/api/contatos`
- POST `/api/auth/google`
- GET `/health`

> **Importante:** Este projeto requer **Python 3.14.0 ou superior**.