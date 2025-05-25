const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/json');

const arquivos = fs.readdirSync(dir);

let erroEncontrado = false;

arquivos.forEach((arquivo) => {
  if (arquivo.endsWith('.json')) {
    const filePath = path.join(dir, arquivo);
    try {
      const conteudo = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(conteudo);

      const camposObrigatorios = ['nome_projeto', 'cliente', 'slug'];

      const faltando = camposObrigatorios.filter(
        (campo) => !json.hasOwnProperty(campo)
      );

      if (faltando.length > 0) {
        console.log(
          `❌ [ERRO] O arquivo ${arquivo} está faltando os campos: ${faltando.join(
            ', '
          )}`
        );
        erroEncontrado = true;
      } else {
        console.log(`✅ [OK] ${arquivo} validado com sucesso.`);
      }
    } catch (e) {
      console.log(`❌ [ERRO] Arquivo ${arquivo} inválido. Verifique a sintaxe JSON.`);
      console.log(e.message);
      erroEncontrado = true;
    }
  }
});

if (erroEncontrado) {
  console.log('\n⚠️ Existem erros nos arquivos JSON. Corrija antes de prosseguir.\n');
  process.exit(1);
} else {
  console.log('\n🎉 Todos os arquivos JSON estão válidos.\n');
}