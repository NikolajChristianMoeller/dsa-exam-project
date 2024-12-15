# Data Structures and Algorithms Exam Project
## - The 0/1 Knapsack Problem | Dynamic Programming

<img src="https://github.com/user-attachments/assets/8c7c7cfe-9302-4ef1-9c57-88d3c3ad6087" width="500"/>

## Kort beskrivelse

Knapsack-problemet er et klassisk optimeringsproblem, hvor man forsøger at finde den mest værdifulde kombination af genstande, der kan passe i en taske med begrænset kapacitet.

I denne visualisering kan brugeren se, hvordan Dynamic Programming-algoritmen arbejder trin for trin for at beregne den optimale løsning.

## Deployede Udgave
https://github.com/NikolajChristianMoeller/dsa-exam-project/edit/main/README.md

## Valg af algoritme og datastruktur
Vi har valgt at implementere Dynamic Programming-tilgangen, som er effektiv til at løse Knapsack-problemet i forhold til brute force.

I stedet for at teste alle mulige kombinationer beregner vi løsninger til mindre delproblemer og genbruger resultaterne.

Vi anvender en 2D-array (dp) til at gemme mellemresultater.

**Dimensioner:** _dp[i][w]_, hvor _i_ er antallet af genstande, og _w_ er taskens kapacitet.

**Indhold:** Hver celle indeholder den maksimale værdi, der kan opnås med kapaciteten w ved brug af de første i genstande.

## Sådan kører du applikationen på din lokale maskine

1. Klon repositoriet
   
   git clone https://github.com/NikolajChristianMoeller/dsa-exam-project.git
  
2. Installer dependencies
   
   npm install
  
3. Kør applikationen

   npm start

4. Åbn en browser
   
   http://127.0.0.1:5501/
