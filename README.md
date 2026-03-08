## Osa 10: React Native

### Tehtävät 10.1-10.2

    - Expo-projektin luonti (rate-repository-app)
    - Sovelluksen käynnistäminen Expo-ympäristössä (android / web)
    - ESLint-konfigurointi React Native -projektiin

### Tehtävät 10.3-10.5

    - RepositoryList ja RepositoryItem -komponentit (FlatList)
    - AppBar + pressable "Repositories"-välilehti
    - Teemakonfiguraatio (theme.js) ja oma Text-komponentti
    - Tyylien eriyttäminen StyleSheet.create-rakenteella
    - Flexbox-layout (row / space-around / alignItems)
    - Avatar-kuva + tilastojen muotoilu (≥ 1000 → x.xk)
    - UI viimeistely (taustavärit, kielitagit, typografia)

### Tehtävät 10.6-10.7

    - Kirjautumisnäkymä SignIn-komponentilla
    - Navigointi AppBarin Link-komponenteilla
    - Vaakasuuntainen scrollaus app barissa ScrollView-komponentilla

### Tehtävät 10.8–10.9

    - Sign-in-kirjautumislomake + hallinta useFormik
    - Validointischema Yupilla
    - Pakolliset kentät username / password
    - Virheilmoitus punaisella

### Tehtävä 10.10

    - Fontti laitteen mukaan (Platform.select)
    - Android: Roboto
    - iOS: Arial
    - Default: System

### Tehtävä 10.11

    - Data haetaan GraphQL:llä backendistä
    - Apollo Sandbox Query toimii
    - useQuery käytössä hookissa
    - välimuisti+päivitys cache-and-network: fethPolicy
    - UI ennallaan

### Tehtävä 10.12

    - Apollo Server URI siirretty ympäristömuuttujaan (.env)
    - Expo extra-kenttä ympäristömuuttujien välittämiseen
    - URI luetaan Constants.expoConfig.extra-polusta

### Tehtävät 10.13-10.14

    - Kirjautuminen yhdistetty GraphQL API:in.
    - `useMutation`-hook authenticate-mutaatiolle
    - `useSignIn`-custom hook
    - Access token onnistuneesta kirjautumisesta
    - Access tokenin tallennuksen valmistelu: AsynStorage + get/set/remove metodit

### Tehtävät 10.15-10.16

    - kirjautumisen jälkeen accessToken tallennetaan AsyncStorageen
    - Apollo Client lisää tokenin Authorization-headeriin kaikkiin pyyntöihin
    - Apollo cache tyhjennetään kirjautumisen jälkeen (resetStore)
    - AppBar näyttää käyttäjän kirjautumistilan ME-queryn avulla
    - Sign out poistaa tokenin tallennuksesta ja resetoi Apollo-cachen

### Tehtävät 10.17-10.18

    - Jest + React Native Testing Library käyttöön
    - RepositoryListContainer-komponentille testi, joka tarkistaa repositorion nimen, kuvauksen, kielen ja tilastot
    - testID lisätty RepositoryItem-komponenttiin testejä varten
    - SignInContainer erotettu omaksi testattavaksi komponentiksi
    - Sign in -lomakkeen testi varmistaa, että username ja password välittyvät oikein onSubmit-handlerille

### Tehtävä 10.19

    - lisätty yksittäisen repositorion näkymä (SingleRepository)
    - GET_REPOSITORY hakee repositorion id:n perusteella
    - useRepository-hook yksittäisen repositorion hakemiseen
    - Open in GitHub -painike
    - navigointi routeen /repository/:id

### Tehtävä 10.20

    - reviewt single repository -näkymä
    - GET_REPOSITORY hakee myös reviewt
    - FlatList-lista
    - repositorion tiedot listan headerissa
    - reviewlle käyttäjä, päivämäärä ja rating

### Tehtävä 10.21

    - review-lomake Formikilla
    - owner name, repository name, rating ja review -kentät
    - Yup-validointi
    - createReview-mutation
    - submit navigoi repositorion näkymään
    - Create a review -välilehti kirjautuneelle käyttäjälle

### Tehtävä 10.22

    - sign up -lomake Formikilla
    - username, password ja password confirmation
    - Yup-validointi
    - createUser-mutation
    - automaattinen kirjautuminen rekisteröinnin jälkeen
    - Sign up näkyy vain uloskirjautuneelle

### Tehtävä 10.23

    - repositoriolistan lajittelu
    - alasvetovalikosta latest, highest rated ja lowest rated
    - listan järjestäminen ratingAverage-arvon mukaan

### Tehtävä 10.24

    - repositoriolistan hakukenttä
    - haku käyttää searchKeyword-parametria
    - syöte debouncataan use-debounce-kirjastolla
    - hakukenttä ja lajittelu listan headerissa

### Tehtävä 10.25

    - My reviews -välilehti kirjautuneelle käyttäjälle
    - reviewt haetaan me-querylla
    - reviewta painamalla siirtyy repositorion sivulle

## Tekoälyn käyttö

Tämän harjoitustyön tekemisen tukena on käytetty tekoälytyökaluja (ChatGPT, Copilot).
Tekoälyä on hyödynnetty erityisesti virhetilanteiden ja ongelmien selvittämisessä sekä rakenteiden tarkistamisessa ja koodin siistimisessä.
