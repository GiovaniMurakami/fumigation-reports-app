export const formCatalog = {
  "formTitle": "Registro de controle de pragas",
  "formUrl": "https://docs.google.com/forms/d/e/1FAIpQLScO6tVglpisTk_XNzXwiSa63X_02iKbjNf6rzXgLCc8hotopw/viewform",
  "initialFields": [
    {
      "section": "Inicial",
      "label": "Unidade do cliente",
      "row": null,
      "description": null,
      "type": "lista_suspensa",
      "entryId": "entry.1721614377",
      "required": true,
      "options": [
        "Unidade - Úmido",
        "Unidade - Seco",
        "Unidade - Refinaria",
        "Unidade - Manutenção",
        "Unidade - Logística",
        "Armazén HFM",
        "Planta Mogi Guaçu"
      ]
    },
    {
      "section": "Inicial",
      "label": "Área/Setor ",
      "row": null,
      "description": null,
      "type": "lista_suspensa",
      "entryId": "entry.1994831449",
      "required": false,
      "options": [
        "P. Úmido - Tombador",
        "P. Úmido - Edifício 5",
        "P. Seco  - Envase de amido",
        "P. Seco - Envase de maltodextrina e dextrina",
        "P. Seco - Edifício 27",
        "P. Seco - Edifício 25B",
        "P. Seco - Edifício 25C",
        "P. Seco - Edifício 25-Morrex",
        "Refinaria - Caramelo",
        "Refinaria - Sorbitol",
        "Refinaria - Edifício 53",
        "Refinaria - Edifício 53C",
        "Manutenção - Oficina mecânica",
        "Logística - Carregamento granel de farelo - Pellet",
        "Logística - Carregamento de óleo",
        "Logística - Carregamento de maltose",
        "Logística - Carregamento de glucose",
        "Logística - Edificio 25",
        "Logística - Edifício 39",
        "Logística - Edifício 43",
        "P. Úmido - Edifício 17",
        "Logística - Portaria vega",
        "Logística - Tremonhas",
        "Logistica - Silos",
        "HFM- Amazém Filial I",
        "HFM- Amazém Filial II",
        "Logística - Edifício 43 B"
      ]
    },
    {
      "section": "Inicial",
      "label": "Controle",
      "row": null,
      "description": null,
      "type": "multipla_escolha",
      "entryId": "entry.1424091944",
      "required": false,
      "options": [
        "Captura de pombos",
        "Retirada de ninhos",
        "Isca roedores - Ratol / GS",
        "Armadilhas luminósas",
        "Arm. Feromônio - Coleopterus",
        "Arm. Feromônio - Lepidópteros",
        "Pulverização Manual",
        "Pulverização Mecanizada",
        "Fumigação",
        "Carregamento",
        "Termonebulização",
        "Limpeza de armazém",
        "Serviços de manutenção"
      ]
    },
    {
      "section": "Inicial",
      "label": "Nº O.S.",
      "row": null,
      "description": null,
      "type": "resposta_curta",
      "entryId": "entry.2017707091",
      "required": false,
      "options": []
    },
    {
      "section": "Inicial",
      "label": "Realizado por:",
      "row": null,
      "description": null,
      "type": "lista_suspensa",
      "entryId": "entry.558955180",
      "required": false,
      "options": [
        "Adenilton Silva",
        "Silvio Bandeira",
        "Alisson Honório",
        "Mário Neto"
      ]
    },
    {
      "section": "Inicial",
      "label": "Data",
      "row": null,
      "description": null,
      "type": "data",
      "entryId": "entry.1365655116",
      "required": false,
      "options": []
    }
  ],
  "controlOptions": [
    "Captura de pombos",
    "Retirada de ninhos",
    "Isca roedores - Ratol / GS",
    "Armadilhas luminósas",
    "Arm. Feromônio - Coleopterus",
    "Arm. Feromônio - Lepidópteros",
    "Pulverização Manual",
    "Pulverização Mecanizada",
    "Fumigação",
    "Carregamento",
    "Termonebulização",
    "Limpeza de armazém",
    "Serviços de manutenção"
  ],
  "controlToSection": {
    "Captura de pombos": "Captura de pombos",
    "Retirada de ninhos": "Captura de ninhos",
    "Isca roedores - Ratol / GS": "Isca roedores - Ratol / GS",
    "Armadilhas luminósas": "Armadilhas luminosas ",
    "Arm. Feromônio - Coleopterus": "Armadilhas feromônio - Coleópterus",
    "Arm. Feromônio - Epdópterus": "Armadilhas feromônio - Lepidópteros",
    "Arm. Feromônio - Lepidópteros": "Armadilhas feromônio - Lepidópteros",
    "Pulverização Manual": "Pulverização - Manual",
    "Pulverização Mecanizada": "Pulverização - Mecanizada",
    "Fumigação": "Fumigação",
    "Carregamento": "Carregamento",
    "Termonebulização": "Termonebulização ",
    "Limpeza de armazém": "Controle e limpeza estrutural",
    "Serviços de manutenção": "Serviços de manutenção"
  },
  "sections": {
    "Carregamento": [],
    "Captura de pombos": [
      {
        "section": "Captura de pombos",
        "label": "Início de intervalo do controle de pombos",
        "row": null,
        "description": null,
        "type": "data",
        "entryId": "entry.1652620175",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Fim de intervalo do controle de pombos",
        "row": null,
        "description": null,
        "type": "data",
        "entryId": "entry.213520070",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Viveiro 1",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1298993964",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1560104325",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Viveiro 2",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.425183536",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1758896497",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Viveiro 3",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1890390026",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.248535956",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Gaiola 1",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1240445904",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.856937593",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Gaiola 2",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1387929216",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.612930040",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Gaiola 3",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1170555199",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1308337483",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Gaiola 4",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1150715136",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1071561880",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Gaiola 5",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1715805277",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.572293944",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Gaiola 6",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1705793097",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Quantidade capturado",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1175542560",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de pombos",
        "label": "Adicionar captura de ninhos ? ",
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.341464970",
        "required": false,
        "options": [
          "Sim",
          "Não"
        ]
      }
    ],
    "Captura de ninhos": [
      {
        "section": "Captura de ninhos",
        "label": "Início de intervalo do controle de pombos",
        "row": null,
        "description": null,
        "type": "data",
        "entryId": "entry.1537826779",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Fim de intervalo do controle de pombos",
        "row": null,
        "description": null,
        "type": "data",
        "entryId": "entry.1766008522",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "1",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.632127393",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "2",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.904289558",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "3",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.62176039",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "4",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1052132369",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "5",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1705938864",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "6",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.192925088",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "7",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.958830511",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "8",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1205531626",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "9",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.986529159",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Remoção de ninhos",
        "row": "10",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.563828920",
        "required": false,
        "options": [
          "Apenas remoção",
          "Repelente Thursan"
        ]
      },
      {
        "section": "Captura de ninhos",
        "label": "Quantidade de ninhos removidos",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1723215412",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Quantidade Ovos",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.196082978",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Quantidade Filhotes",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.142978777",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Observação ",
        "row": null,
        "description": "Relatar os pontos onde houveram remoção e aplicação de repelente",
        "type": "resposta_curta",
        "entryId": "entry.533756194",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 1",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.71565901",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto  2",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1773269982",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 3",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.417687383",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 4",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.697043453",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 5",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1227960115",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 6",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.373175315",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 7",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1296373941",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 8",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1133451125",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 9",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1909078440",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Foto 10",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.656028899",
        "required": false,
        "options": []
      },
      {
        "section": "Captura de ninhos",
        "label": "Adicionar captura de pombos? ",
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1171350490",
        "required": false,
        "options": [
          "Sim",
          "Não"
        ]
      }
    ],
    "Isca roedores - Ratol / GS": [
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "1",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1473270045",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "2",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1575509914",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "3",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.122377754",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "4",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.2099626318",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "5",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1808659746",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "6",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1899903950",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "7",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.65658162",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "8",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.4127717",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "9",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1223298453",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "10",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.127025054",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "11",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1352431679",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "12",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.143372222",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "13",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1193296445",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "14",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.2059880809",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "15",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.173189231",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "16",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.359858635",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "17",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.375082770",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "18",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.361530669",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "19",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1036110971",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "20",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.550745872",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "21",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.2076071372",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "22",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.2085409713",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "23",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1821898858",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "24",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.119458758",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "25",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1566649813",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "26",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.181419696",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "27",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.852221546",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "28",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.239557864",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "29",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1866633127",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "30",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.769958265",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "31",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1993731865",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "32",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.1720907821",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": "33",
        "description": "CO - Consumido - Quando houve o consumo  \nDE - Desgastado - Quando placa sofreu desgaste natural\nAU - Ausente - Quando houve extravio ou subtração da isca/ placa \nOB - Obstruído - Quando não é possível alcançar o local onde está a placa de captura \nIN - Intacto - Quando não há captua e a placa permanece como da ultima vez que foi vistoriada ",
        "type": "grade_multipla_escolha",
        "entryId": "entry.109159305",
        "required": false,
        "options": [
          "CO - Consumido",
          "DE - Desgastado",
          "AU - Ausente",
          "OB - Obstruído",
          "IN - Intacto"
        ]
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": "Registro primeiro porta isca",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1794873549",
        "required": false,
        "options": []
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": "Registro ultimo porta isca",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.855611869",
        "required": false,
        "options": []
      },
      {
        "section": "Isca roedores - Ratol / GS",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.874891132",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Armadilhas luminosas ": [
      {
        "section": "Armadilhas luminosas ",
        "label": "Dias de exposição",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1268967755",
        "required": false,
        "options": []
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 1",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.571009824",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 1",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.30764653",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 1",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1738225345",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 1",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.746795031",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 1",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1141297565",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 1",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.661896670",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 2",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1437081671",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 2",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1480502546",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 2",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1960730865",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 2",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.233707586",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 2",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1326130539",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 2",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.333310370",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 3",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1063447968",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 3",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.2077541708",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 3",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1876287061",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 3",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.2082708687",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 3",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.761870716",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 3",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1283437881",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 4",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.591462606",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 4",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1729103376",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 4",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.286137258",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 4",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.680221116",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 4",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.183616102",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 4",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.729171985",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 5",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.601621812",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 5",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1791143271",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 5",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.47787927",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 5",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.865481910",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 5",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1281124089",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 5",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.879290518",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 6",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.223949868",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 6",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.331076979",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 6",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.706553193",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 6",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1246530023",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 6",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.424750833",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 6",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1795586927",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 7",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.184977071",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 7",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.173029654",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 7",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1478170801",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 7",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.786962424",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 7",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1135796329",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 7",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.723959180",
        "required": false,
        "options": [
          "0",
          "1-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 8",
        "row": "DIPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.447755992",
        "required": false,
        "options": [
          "0",
          "0-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 8",
        "row": "HYMENOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1868388287",
        "required": false,
        "options": [
          "0",
          "0-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 8",
        "row": "LEPDOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1628234281",
        "required": false,
        "options": [
          "0",
          "0-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 8",
        "row": "COLEOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1654772441",
        "required": false,
        "options": [
          "0",
          "0-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 8",
        "row": "ISOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.490552636",
        "required": false,
        "options": [
          "0",
          "0-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Isca 8",
        "row": "HOMOPTERA",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.131125488",
        "required": false,
        "options": [
          "0",
          "0-10",
          "10-20",
          "20-50",
          "50-70",
          "70-100",
          "100-150",
          "150-300",
          ">300"
        ]
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Foto Armadilha 1/2",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.236773877",
        "required": false,
        "options": []
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Foto Armadilha 3/4",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1770156306",
        "required": false,
        "options": []
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Foto Armadilha 5/6",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1375480832",
        "required": false,
        "options": []
      },
      {
        "section": "Armadilhas luminosas ",
        "label": "Foto Armadilha 7/8",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.2037530345",
        "required": false,
        "options": []
      },
      {
        "section": "Armadilhas luminosas ",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1552617942",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Armadilhas feromônio - Coleópterus": [
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 1",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1970914706",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 1",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1398725110",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 2",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1058765713",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 2",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.568837594",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 3",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.135763871",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 3",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.394094483",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 4",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.137053529",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 4",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.524494979",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 5",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1064022733",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 5",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.54388451",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 6",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.2104446489",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 6",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1728929538",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 7",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1924718874",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 7",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1529037162",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 8",
        "row": "Lasioderma serricorne",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.970779202",
        "required": false,
        "options": [
          "0 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": "Isca 8",
        "row": "Phaleria Cadaverina",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1176167287",
        "required": false,
        "options": [
          "0 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Coleópterus",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1677209720",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Armadilhas feromônio - Lepidópteros": [
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 1",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1682212671",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 1",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1898953532",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 1",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.118433476",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 2",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1340077124",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 2",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.173681192",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 2",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1296476876",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 3",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.911870788",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 3",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1470239602",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 3",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1144847152",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 4",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1990590203",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 4",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1308441031",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 4",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.456614742",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 5",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.328341342",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 5",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1479787948",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 5",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.428406712",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 6",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.510427120",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 6",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1548207209",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 6",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1810824111",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 7",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1072898283",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 7",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1606972386",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 7",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1622457239",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 8",
        "row": "Epheshia Cautella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.586665046",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 8",
        "row": "Plodia Interpunctella",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.1520410922",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": "Isca 8",
        "row": "Outros",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.166068595",
        "required": false,
        "options": [
          "0",
          "1 - 10",
          "10 - 20",
          "20 -50",
          "50 - 70",
          "70 - 90",
          ">90"
        ]
      },
      {
        "section": "Armadilhas feromônio - Lepidópteros",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1650343207",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Pulverização - Manual": [
      {
        "section": "Pulverização - Manual",
        "label": "Produtos",
        "row": null,
        "description": null,
        "type": "caixas_de_selecao",
        "entryId": "entry.246971692",
        "required": false,
        "options": [
          "Bergard",
          "Demand",
          "Synper",
          "Devetion",
          "Tenopa"
        ]
      },
      {
        "section": "Pulverização - Manual",
        "label": "Volume utilizado - ML",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1030375436",
        "required": false,
        "options": []
      },
      {
        "section": "Pulverização - Manual",
        "label": "Foto 1 - Pulverização M.",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.213684188",
        "required": false,
        "options": []
      },
      {
        "section": "Pulverização - Manual",
        "label": "Foto 2 - Pulverização M.",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.618957043",
        "required": false,
        "options": []
      },
      {
        "section": "Pulverização - Manual",
        "label": "Foto 3 - Pulverização M.",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.513525970",
        "required": false,
        "options": []
      },
      {
        "section": "Pulverização - Manual",
        "label": "Foto 4 - Pulverização M.",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1284737455",
        "required": false,
        "options": []
      },
      {
        "section": "Pulverização - Manual",
        "label": "Observação - Atividade Pulverização",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.375858029",
        "required": false,
        "options": []
      },
      {
        "section": "Pulverização - Manual",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1132270431",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Pulverização - Mecanizada": [
      {
        "section": "Pulverização - Mecanizada",
        "label": "Produtos",
        "row": null,
        "description": null,
        "type": "caixas_de_selecao",
        "entryId": "entry.1124549427",
        "required": false,
        "options": [
          "Bergard",
          "Demand",
          "Synper",
          "Devetion",
          "Tenopa"
        ]
      },
      {
        "section": "Pulverização - Mecanizada",
        "label": "Volume utilizado - ML",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.680526751",
        "required": false,
        "options": []
      },
      {
        "section": "Pulverização - Mecanizada",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1340994064",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Fumigação": [
      {
        "section": "Fumigação",
        "label": "Produtos",
        "row": null,
        "description": null,
        "type": "caixas_de_selecao",
        "entryId": "entry.1132513186",
        "required": false,
        "options": [
          "BROMETO DE METILA / METHIL BROMIDE (CH3 Br)",
          "FOSFINA / PHOSPHINE (PH3)"
        ]
      },
      {
        "section": "Fumigação",
        "label": "Produto Utilizado",
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.2058682976",
        "required": false,
        "options": [
          "PHOSTEK - BEQUISA"
        ]
      },
      {
        "section": "Fumigação",
        "label": "Lote",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1601749869",
        "required": false,
        "options": []
      },
      {
        "section": "Fumigação",
        "label": "Dosagem",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1335295697",
        "required": false,
        "options": []
      },
      {
        "section": "Fumigação",
        "label": "Quantidade",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1553213581",
        "required": false,
        "options": []
      },
      {
        "section": "Fumigação",
        "label": "Data Início ",
        "row": null,
        "description": null,
        "type": "data",
        "entryId": "entry.1661451672",
        "required": false,
        "options": []
      },
      {
        "section": "Fumigação",
        "label": "Hora Início",
        "row": null,
        "description": null,
        "type": "hora",
        "entryId": "entry.194983675",
        "required": false,
        "options": []
      },
      {
        "section": "Fumigação",
        "label": "Data Fim",
        "row": null,
        "description": null,
        "type": "data",
        "entryId": "entry.2031509747",
        "required": false,
        "options": []
      },
      {
        "section": "Fumigação",
        "label": "Hora Fim",
        "row": null,
        "description": null,
        "type": "hora",
        "entryId": "entry.1926653629",
        "required": false,
        "options": []
      },
      {
        "section": "Fumigação",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.925523424",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Termonebulização ": [
      {
        "section": "Termonebulização ",
        "label": "Produtos",
        "row": null,
        "description": null,
        "type": "caixas_de_selecao",
        "entryId": "entry.1665116572",
        "required": false,
        "options": [
          "Bergard",
          "Synper",
          "Devetion"
        ]
      },
      {
        "section": "Termonebulização ",
        "label": "Volume utilizado - ML",
        "row": null,
        "description": null,
        "type": "resposta_curta",
        "entryId": "entry.1402719885",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": "Foto 1 - Termonebilização",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.153979437",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": "Foto 2 - Termonebilização",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.493651499",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": "Foto 3 - Termonebilização",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1599931017",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": "Foto 4 - Termonebilização",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.966774660",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": "Foto 5 - Termonebilização",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1308479430",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": "Foto 6 - Termonebilização",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.697413912",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": "Foto 8 - Termonebilização",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.905986876",
        "required": false,
        "options": []
      },
      {
        "section": "Termonebulização ",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.817314216",
        "required": false,
        "options": [
          "Finalizar registro",
          "Complementar o registro"
        ]
      }
    ],
    "Controle e limpeza estrutural": [
      {
        "section": "Controle e limpeza estrutural",
        "label": null,
        "row": "Interno",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.16363879",
        "required": false,
        "options": [
          "Limpeza estrutural",
          "Limpeza aérea"
        ]
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": null,
        "row": "Externo",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.2039840101",
        "required": false,
        "options": [
          "Limpeza estrutural",
          "Limpeza aérea"
        ]
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Tipo de limpeza",
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1481458110",
        "required": false,
        "options": [
          "Limpeza com ar forçado / varredura",
          "Limpeza mecânica (Água corrente)",
          "Limpeza mecânica (Água Pressurizada)",
          "Limpeza mecânica (Água Pressurizada + Químico)"
        ]
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Plataforma",
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.693965209",
        "required": false,
        "options": [
          "Sim (BSP)",
          "Sim (Cliente)",
          "Não houve uso"
        ]
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Observações do técnico",
        "row": null,
        "description": null,
        "type": "paragrafo",
        "entryId": "entry.635819739",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto 1A - Panorâmica Antes da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.725928545",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto 2A - Detalhe Antes da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1137096733",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto 3A - Detalhe Antes da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.2105340210",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto1D - Panorâmica Depois  da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1003130106",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto 2D - Detalhe Depois da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1564434071",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto 3D - Detalhe Depois da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.865455076",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto 4D - Detalhe Depois da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.921844971",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": "Foto 5D - Detalhe Depois da limpeza",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.40593218",
        "required": false,
        "options": []
      },
      {
        "section": "Controle e limpeza estrutural",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.963639765",
        "required": false,
        "options": [
          "Enviar OS",
          "Demandar mais atividades"
        ]
      }
    ],
    "Serviços de manutenção": [
      {
        "section": "Serviços de manutenção",
        "label": null,
        "row": "Interno",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.90956309",
        "required": false,
        "options": [
          "Manutenção Predial",
          "Manutenção Elétrica"
        ]
      },
      {
        "section": "Serviços de manutenção",
        "label": null,
        "row": "Externo",
        "description": null,
        "type": "grade_multipla_escolha",
        "entryId": "entry.221668073",
        "required": false,
        "options": [
          "Manutenção Predial",
          "Manutenção Elétrica"
        ]
      },
      {
        "section": "Serviços de manutenção",
        "label": "Tipo de manutenção",
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.1928884441",
        "required": false,
        "options": [
          "Portas, Janelas, Acessos, Alçapões",
          "Pintura / Revitalização visual",
          "Elétrica de maquina",
          "Elétrica infra-estrutura"
        ]
      },
      {
        "section": "Serviços de manutenção",
        "label": "Resultado final ",
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.359892755",
        "required": false,
        "options": [
          "Resolvido",
          "Paleativo",
          "Pendente"
        ]
      },
      {
        "section": "Serviços de manutenção",
        "label": "Observações do técnico",
        "row": null,
        "description": null,
        "type": "paragrafo",
        "entryId": "entry.370005004",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto 1A - Panorâmica Antes do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1106807552",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto 2A - Detalhe Antes do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.223930683",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto 3A - Detalhe Antes  do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1087002408",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto1D - Panorâmica Depois  do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.215697749",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto 2D - Detalhe Depois  do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.2063546517",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto 3D - Detalhe Depois do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1675647392",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto 4D - Detalhe Depois  do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1168064551",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": "Foto 5D - Detalhe Depois  do serviço",
        "row": null,
        "description": null,
        "type": "upload_arquivo",
        "entryId": "entry.1013937006",
        "required": false,
        "options": []
      },
      {
        "section": "Serviços de manutenção",
        "label": null,
        "row": null,
        "description": null,
        "type": "multipla_escolha",
        "entryId": "entry.672230428",
        "required": false,
        "options": [
          "Enviar OS",
          "Demandar mais atividades"
        ]
      }
    ]
  }
};
