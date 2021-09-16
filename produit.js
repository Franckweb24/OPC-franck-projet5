
main()

async function main() {

    getArticleId();
}

function getArticleId() {
    const articleId = $_GET("id");

    return fetch(`http://localhost:3000/api/teddies/` + articleId)
        .then(async function (res) {
            return res.json()
        })
        .then(function (article) {
            displayArticle(article);
            return article
        })
        .catch(function (error) {
            alert(error)
        })
}

function displayArticle(article) {
    const element = document.getElementById("article");

    let vueArticle = `  
        
    <figure id="encart-art" class= "encart-art">
    <img class="teddy-img" src="`+ article.imageUrl + ` "width=""height="">

    <div class="info" id="info">     
        <figcaption class="name">`+ article.name + `</figcaption>
        <figcaption class="description">`+ article.description + `</figcaption>
        <figcaption class="price" id="price">` + article.price / 100 + ",00 €" + `</figcaption>

        <label id="quantite-produit" class="quantite-produit">Quantité</label><input type="number" id="quantite" style="width:4rem"
        class="input-sm form-control"></input>

        <button class="btn-card" class="btn btn-primary" type="submit" onclick="ajouter()"><span
            class="glyphicon glyphicon-shopping-cart"></span> Ajouter au panier</button>

    </div>


    </figure>`

    element.insertAdjacentHTML('afterend', vueArticle);
}


/*-----function pour récupérer les paramétres GET d'une URL------*/


function $_GET(param) {
    let lets = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            lets[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return lets[param] ? lets[param] : null;
    }
    return lets;
}

/*-----------------function pour ajouter au tableau------------------*/


function ajouter() {
    const articleId = $_GET("id");
    let produit = articleId;
    let quantite = parseInt(document.getElementById("quantite").value);
    let price = parseInt(document.getElementById("price").innerHTML);
    let monPanier = new Panier(); console.log(quantite);
    monPanier.ajouterArticle(produit, quantite, price);
    let tableau = document.getElementById("tableau");
    let longueurTab = parseInt(document.getElementById("quantite").value);


    /*-----------------création du tableau-----------------------*/


    let longueur = monPanier.liste.length;
    for (let i = 0; i < longueur; i++) {
        let ligne = monPanier.liste[i];

        let ligneTableau = tableau.insertRow(-1);
        let colonne1 = ligneTableau.insertCell(0);

        colonne1.innerHTML += ligne.getproduit();
        let colonne2 = ligneTableau.insertCell(1);

        colonne2.innerHTML += ligne.quantiteArticle;
        let colonne3 = ligneTableau.insertCell(2);

        colonne3.innerHTML += ligne.priceArticle;
        let colonne4 = ligneTableau.insertCell(3);

        colonne4.innerHTML += ligne.getpriceLigne();
        let colonne5 = ligneTableau.insertCell(4);

        colonne5.innerHTML += "<button class=\"btn-retirer\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span></span> Retirer</button>";
    } 

    console.log(quantite);

    document.getElementById("priceTotal").innerHTML = monPanier.getpricePanier();

    if (isNaN(longueur) || longueur == "NaN" || longueur == "") {
        longueur = 0;
    }

    document.getElementById("nbreLignes").innerHTML = longueur;

    document.getElementById("nb-article").innerHTML = quantite;

    /*--------------------local Storage--------------------*/


    localStorage.setItem("monpanier[]", JSON.stringify(monPanier));
    console.log(localStorage.getItem('monpanier')); 

}


/*----------function suprimer pour les lignes du tableau de commande---------*/


function supprimer(produit) {
    let monPanier = new Panier();
    let tableau = document.getElementById("tableau");
    let longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
    if (longueurTab > 0) {
        for (let i = longueurTab; i > 0; i--) {
            monPanier.ajouterArticle(parseInt(tableau.rows[i].cells[0].innerHTML), parseInt(tableau.rows[i].cells[1].innerHTML), parseInt(tableau.rows[i].cells[2].innerHTML));
            tableau.deleteRow(i);
        }
    }
    monPanier.supprimerArticle(produit);

    let longueur = monPanier.liste.length;
    console.log('longueur' + longueur);

    if (isNaN(longueur) || longueur == "NaN" || longueur == "") {
        longueur = 0;
    }

    document.getElementById("quantite").value = 0;
    document.getElementById("priceTotal").innerHTML = '';
    document.getElementById("nb-article").innerHTML = '';
    document.getElementById("nbreLignes").innerHTML = 0;
}













