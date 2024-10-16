const quiz = [
  {"question": "What is the capital of France?", "answer": "Paris"},
  {"question": "What is the largest planet in our solar system?", "answer": "Jupiter"},
  {"question": "Who wrote 'To Kill a Mockingbird'?", "answer": "Harper Lee"},
  {"question": "What is the chemical symbol for gold?", "answer": "Au"},
  {"question": "What is the tallest mountain in the world?", "answer": "Mount Everest"},
  {"question": "Who painted the Mona Lisa?", "answer": "Leonardo da Vinci"},
  {"question": "What is the smallest country in the world?", "answer": "Vatican City"},
  {"question": "What is the main ingredient in guacamole?", "answer": "Avocado"},
  {"question": "What year did the Titanic sink?", "answer": "1912"},
  {"question": "What is the hardest natural substance on Earth?", "answer": "Diamond"},
  {"question": "What is the longest river in the world?", "answer": "Nile"},
  {"question": "Who developed the theory of relativity?", "answer": "Albert Einstein"},
  {"question": "What is the capital of Japan?", "answer": "Tokyo"},
  {"question": "What is the largest mammal?", "answer": "Blue Whale"},
  {"question": "Who is known as the 'Father of Computers'?", "answer": "Charles Babbage"},
  {"question": "What is the chemical symbol for water?", "answer": "H2O"},
  {"question": "What is the fastest land animal?", "answer": "Cheetah"},
  {"question": "Who wrote '1984'?", "answer": "George Orwell"},
  {"question": "What is the capital of Australia?", "answer": "Canberra"},
  {"question": "What is the largest desert in the world?", "answer": "Sahara"},
  {"question": "Who discovered penicillin?", "answer": "Alexander Fleming"},
  {"question": "What is the smallest bone in the human body?", "answer": "Stapes"},
  {"question": "What is the capital of Canada?", "answer": "Ottawa"},
  {"question": "What is the largest ocean on Earth?", "answer": "Pacific Ocean"},
  {"question": "Who painted the Sistine Chapel ceiling?", "answer": "Michelangelo"},
  {"question": "What is the chemical symbol for sodium?", "answer": "Na"},
  {"question": "What is the most spoken language in the world?", "answer": "Mandarin Chinese"},
  {"question": "Who wrote 'Pride and Prejudice'?", "answer": "Jane Austen"},
  {"question": "What is the capital of Italy?", "answer": "Rome"},
  {"question": "What is the largest continent?", "answer": "Asia"},
  {"question": "Who invented the telephone?", "answer": "Alexander Graham Bell"},
  {"question": "What is the chemical symbol for iron?", "answer": "Fe"},
  {"question": "What is the fastest bird?", "answer": "Peregrine Falcon"},
  {"question": "Who wrote 'The Great Gatsby'?", "answer": "F. Scott Fitzgerald"},
  {"question": "What is the capital of Germany?", "answer": "Berlin"},
  {"question": "What is the largest island in the world?", "answer": "Greenland"},
  {"question": "Who discovered gravity?", "answer": "Isaac Newton"},
  {"question": "What is the chemical symbol for oxygen?", "answer": "O"},
  {"question": "What is the tallest building in the world?", "answer": "Burj Khalifa"},
  {"question": "Who wrote 'Moby-Dick'?", "answer": "Herman Melville"},
  {"question": "What is the capital of Russia?", "answer": "Moscow"},
  {"question": "What is the largest lake in the world?", "answer": "Caspian Sea"},
  {"question": "Who invented the light bulb?", "answer": "Thomas Edison"},
  {"question": "What is the chemical symbol for carbon?", "answer": "C"},
  {"question": "What is the fastest fish?", "answer": "Sailfish"},
  {"question": "Who wrote 'War and Peace'?", "answer": "Leo Tolstoy"},
  {"question": "What is the capital of Brazil?", "answer": "Brasília"},
  {"question": "What is the largest volcano in the world?", "answer": "Mauna Loa"},
  {"question": "Who discovered America?", "answer": "Christopher Columbus"},
  {"question": "What is the chemical symbol for potassium?", "answer": "K"},
  {"question": "What is the longest bone in the human body?", "answer": "Femur"},
  {"question": "Who wrote 'The Odyssey'?", "answer": "Homer"},
  {"question": "What is the capital of China?", "answer": "Beijing"},
  {"question": "What is the largest rainforest in the world?", "answer": "Amazon Rainforest"},
  {"question": "Who invented the airplane?", "answer": "Wright Brothers"},
  {"question": "What is the chemical symbol for silver?", "answer": "Ag"},
  {"question": "What is the fastest growing plant?", "answer": "Bamboo"},
  {"question": "Who wrote 'The Catcher in the Rye'?", "answer": "J.D. Salinger"},
  {"question": "What is the capital of India?", "answer": "New Delhi"},
  {"question": "What is the largest coral reef system?", "answer": "Great Barrier Reef"},
  {"question": "Who discovered radioactivity?", "answer": "Henri Becquerel"},
  {"question": "What is the chemical symbol for lead?", "answer": "Pb"},
  {"question": "What is the most abundant gas in the Earth's atmosphere?", "answer": "Nitrogen"},
  {"question": "Who wrote 'The Hobbit'?", "answer": "J.R.R. Tolkien"},
  {"question": "What is the capital of Egypt?", "answer": "Cairo"},
  {"question": "What is the largest animal ever to have lived?", "answer": "Blue Whale"},
  {"question": "Who invented the World Wide Web?", "answer": "Tim Berners-Lee"},
  {"question": "What is the chemical symbol for mercury?", "answer": "Hg"},
  {"question": "What is the fastest car in the world?", "answer": "Bugatti Chiron Super Sport 300+"},
  {"question": "Who wrote 'The Divine Comedy'?", "answer": "Dante Alighieri"},
  {"question": "What is the capital of Mexico?", "answer": "Mexico City"},
  {"question": "What is the largest canyon in the world?", "answer": "Grand Canyon"},
  {"question": "Who discovered the structure of DNA?", "answer": "James Watson and Francis Crick"},
  {"question": "What is the chemical symbol for zinc?", "answer": "Zn"},
  {"question": "What is the most populous country in the world?", "answer": "China"},
  {"question": "Who wrote 'The Iliad'?", "answer": "Homer"},
  {"question": "What is the capital of Spain?", "answer": "Madrid"},
  {"question": "What is the largest city in the world by population?", "answer": "Tokyo"},
  {"question": "Who invented the printing press?", "answer": "Johannes Gutenberg"},
  {"question": "What is the chemical symbol for copper?", "answer": "Cu"},
  {"question": "What is the fastest train in the world?", "answer": "Shanghai Maglev"},
  {"question": "Who wrote 'The Brothers Karamazov'?", "answer": "Fyodor Dostoevsky"},
  {"question": "What is the capital of South Korea?", "answer": "Seoul"},
  {"question": "What is the largest waterfall in the world?", "answer": "Angel Falls"},
  {"question": "Who discovered the electron?", "answer": "J.J. Thomson"},
  {"question": "What is the chemical symbol for helium?", "answer": "He"},
  {"question": "What is the most visited country in the world?", "answer": "France"},
  {"question": "Who wrote 'Don Quixote'?", "answer": "Miguel de Cervantes"},
  {"question": "What is the capital of Argentina?", "answer": "Buenos Aires"},
  {"question": "What is the largest island country?", "answer": "Indonesia"},
  {"question": "Who discovered the law of universal gravitation?", "answer": "Isaac Newton"},
  {"question": "What is the chemical symbol for chlorine?", "answer": "Cl"},
  {"question": "What is the fastest animal in the water?", "answer": "Sailfish"},
  {"question": "Who wrote 'The Picture of Dorian Gray'?", "answer": "Oscar Wilde"},
  {"question": "What is the capital of Turkey?", "answer": "Ankara"},
  {"question": "What is the largest hot desert in the world?", "answer": "Sahara Desert"},
  {"question": "Who discovered the neutron?", "answer": "James Chadwick"},
  {"question": "What is the chemical symbol for magnesium?", "answer": "Mg"}
]

export default quiz;
