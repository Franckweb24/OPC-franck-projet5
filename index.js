//Page d'acceuil avec les articles

main()

async function main() {
    const articles = await getArticles();
    console.log(articles); // Affichage de array dans la console pour vérifier si fetch répond
    for (article of articles) {
        displayArticle(article); //display défini le type d'affichage,article l'élément de contenu
    }

}

function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function (res) {
            return res.json()
        })
        .then(function (articles) {
            return articles
        })
        .catch(function (error) {
            alert(error)
        })
}

//function pour récuperer et afficher les articles sur la page d'acceuil

function displayArticle(article) {
    const element = document.getElementById("produit");
    let vueArticle = `       
    <figure id="encart-art" class= "encart-art">    
        <img class="teddy-img" src="`+ article.imageUrl + ` "width=""height="">
    <div class="info" id="info">        
        <figcaption class="name">`+ article.name + `</figcaption>
        <figcaption class="description">`+ article.description + `</figcaption>
        <figcaption class="price" id="price">` + article.price/100 + ",00 €" + `</figcaption>
        <button type="button" onclick="window.location.href = 'produit.html?id=`+ article._id + `'" class="btn-card">Voir l'article</button>
    </div>
    </figure>`
    console.log(article['imageUrl']); //pour la visualisation des Url dans la console
    element.insertAdjacentHTML('afterend', vueArticle);
}







