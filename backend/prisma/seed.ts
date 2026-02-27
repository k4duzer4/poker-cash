/// <reference types="node" />
import 'dotenv/config';

const seed = async () => {
  console.log('Seed placeholder: implemente os inserts iniciais aqui.');
};

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
