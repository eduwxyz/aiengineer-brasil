---
video: null
---

## Tools e Function Calling

LLMs sozinhos só geram texto. Não conseguem buscar na web, consultar banco de dados, enviar email ou fazer um cálculo preciso. Pra isso, você precisa dar ferramentas pra eles.

Function calling (ou tool use) é a capacidade de um LLM identificar quando precisa usar uma ferramenta externa e gerar os parâmetros corretos pra chamá-la.

### Como funciona

Você define as ferramentas disponíveis e o modelo decide quando e como usá-las:

```python
from openai import OpenAI

client = OpenAI()

# Define a ferramenta
tools = [
    {
        "type": "function",
        "function": {
            "name": "buscar_clima",
            "description": "Busca a previsão do tempo para uma cidade",
            "parameters": {
                "type": "object",
                "properties": {
                    "cidade": {
                        "type": "string",
                        "description": "Nome da cidade"
                    }
                },
                "required": ["cidade"]
            }
        }
    }
]

# Faz a chamada
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Como está o tempo em São Paulo?"}],
    tools=tools
)

# O modelo não responde direto - ele pede pra usar a ferramenta
print(response.choices[0].message.tool_calls)
# [ToolCall(function=Function(name='buscar_clima', arguments='{"cidade": "São Paulo"}'))]
```

O modelo não executa a função. Ele só diz qual função quer chamar e com quais argumentos. Você executa no seu código e devolve o resultado.

### O fluxo completo

```excalidraw
{"elements":[{"type":"text","x":20,"y":50,"width":80,"height":25,"text":"Pergunta","fontSize":16,"fontFamily":2,"strokeColor":"#ffffff","id":"t1","seed":1},{"type":"arrow","x":105,"y":62,"width":30,"height":0,"strokeColor":"#6b9ac4","strokeWidth":2,"roughness":1,"points":[[0,0],[30,0]],"id":"a1","seed":2},{"type":"rectangle","x":145,"y":40,"width":70,"height":45,"strokeColor":"#6b9ac4","backgroundColor":"transparent","fillStyle":"hachure","strokeWidth":2,"roughness":1,"roundness":{"type":3},"id":"llm1","seed":3},{"type":"text","x":165,"y":52,"width":30,"height":25,"text":"LLM","fontSize":14,"fontFamily":2,"strokeColor":"#ffffff","id":"t2","seed":4},{"type":"arrow","x":225,"y":62,"width":30,"height":0,"strokeColor":"#e07a5f","strokeWidth":2,"roughness":1,"points":[[0,0],[30,0]],"id":"a2","seed":5},{"type":"rectangle","x":265,"y":40,"width":70,"height":45,"strokeColor":"#e07a5f","backgroundColor":"transparent","fillStyle":"hachure","strokeWidth":2,"roughness":1,"roundness":{"type":3},"id":"tool","seed":6},{"type":"text","x":285,"y":52,"width":30,"height":25,"text":"Tool","fontSize":14,"fontFamily":2,"strokeColor":"#ffffff","id":"t3","seed":7},{"type":"arrow","x":345,"y":62,"width":30,"height":0,"strokeColor":"#81b29a","strokeWidth":2,"roughness":1,"points":[[0,0],[30,0]],"id":"a3","seed":8},{"type":"rectangle","x":385,"y":40,"width":70,"height":45,"strokeColor":"#81b29a","backgroundColor":"transparent","fillStyle":"hachure","strokeWidth":2,"roughness":1,"roundness":{"type":3},"id":"llm2","seed":9},{"type":"text","x":405,"y":52,"width":30,"height":25,"text":"LLM","fontSize":14,"fontFamily":2,"strokeColor":"#ffffff","id":"t4","seed":10},{"type":"arrow","x":465,"y":62,"width":30,"height":0,"strokeColor":"#f2cc8f","strokeWidth":2,"roughness":1,"points":[[0,0],[30,0]],"id":"a4","seed":11},{"type":"text","x":505,"y":50,"width":80,"height":25,"text":"Resposta","fontSize":16,"fontFamily":2,"strokeColor":"#ffffff","id":"t5","seed":12},{"type":"text","x":230,"y":20,"width":60,"height":15,"text":"tool_call","fontSize":11,"fontFamily":2,"strokeColor":"#a1a1aa","id":"l1","seed":13},{"type":"text","x":345,"y":20,"width":60,"height":15,"text":"resultado","fontSize":11,"fontFamily":2,"strokeColor":"#a1a1aa","id":"l2","seed":14}]}
```

```python
def buscar_clima(cidade):
    # Aqui você chamaria uma API de clima de verdade
    return {"temperatura": 25, "condicao": "ensolarado"}

# 1. Primeira chamada - modelo decide usar ferramenta
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Como está o tempo em São Paulo?"}],
    tools=tools
)

# 2. Extrai a chamada de função
tool_call = response.choices[0].message.tool_calls[0]
nome_funcao = tool_call.function.name
argumentos = json.loads(tool_call.function.arguments)

# 3. Executa a função
resultado = buscar_clima(argumentos["cidade"])

# 4. Devolve o resultado pro modelo
messages = [
    {"role": "user", "content": "Como está o tempo em São Paulo?"},
    response.choices[0].message,  # Mensagem com tool_calls
    {
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(resultado)
    }
]

# 5. Modelo gera resposta final
final_response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools
)

print(final_response.choices[0].message.content)
# "Em São Paulo está fazendo 25°C com tempo ensolarado."
```

### Quando usar

**Buscar informação atual**: Clima, cotações, notícias — coisas que mudam.

**Consultar seus dados**: Banco de dados, APIs internas, documentos.

**Executar ações**: Enviar email, criar tarefa, fazer reserva.

**Cálculos precisos**: Matemática complexa, conversões, datas.

### Exemplos de ferramentas úteis

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "calcular",
            "description": "Executa cálculos matemáticos",
            "parameters": {
                "type": "object",
                "properties": {
                    "expressao": {"type": "string", "description": "Expressão matemática"}
                },
                "required": ["expressao"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "buscar_produto",
            "description": "Busca informações de um produto no catálogo",
            "parameters": {
                "type": "object",
                "properties": {
                    "nome": {"type": "string"},
                    "categoria": {"type": "string"}
                },
                "required": ["nome"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "enviar_email",
            "description": "Envia um email",
            "parameters": {
                "type": "object",
                "properties": {
                    "destinatario": {"type": "string"},
                    "assunto": {"type": "string"},
                    "corpo": {"type": "string"}
                },
                "required": ["destinatario", "assunto", "corpo"]
            }
        }
    }
]
```

### Boas práticas

**Descrições claras**: O modelo decide qual ferramenta usar baseado na descrição. Seja específico.

```python
# Ruim
"description": "Busca coisas"

# Bom
"description": "Busca produtos no catálogo pelo nome. Retorna preço, estoque e descrição."
```

**Valide os argumentos**: O modelo pode gerar argumentos inválidos. Sempre valide antes de executar.

```python
def executar_ferramenta(nome, argumentos):
    if nome == "buscar_produto":
        if not argumentos.get("nome"):
            return {"erro": "Nome do produto é obrigatório"}
        return buscar_produto(argumentos["nome"])
```

**Trate erros graciosamente**: Se a ferramenta falhar, devolva uma mensagem de erro clara pro modelo.

```python
try:
    resultado = buscar_clima(cidade)
except Exception as e:
    resultado = {"erro": f"Não foi possível buscar o clima: {str(e)}"}
```

**Limite as ferramentas**: Não dê todas as ferramentas possíveis. Quanto mais opções, mais chance do modelo escolher errado.

### OpenAI vs Anthropic

A sintaxe muda um pouco entre providers, mas o conceito é o mesmo.

**OpenAI** usa `tools` e `tool_calls`:
```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools
)
```

**Anthropic** usa `tools` e `tool_use`:
```python
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    messages=messages,
    tools=tools
)
```

Os schemas de ferramentas são praticamente iguais. A diferença maior está em como você extrai e devolve os resultados.

### Isso é a base de AI Agents

Function calling é o que permite LLMs fazerem coisas além de gerar texto. Quando você combina:

- Um loop que continua até a tarefa estar completa
- Várias ferramentas disponíveis
- Capacidade do modelo de decidir qual usar

Você tem um agente. Mas isso fica pro módulo de AI Agents. Por enquanto, o importante é entender que LLMs podem usar ferramentas — e isso muda tudo sobre o que você consegue construir com eles.
