//const e = require("express");

function Panier() {
    this.liste = [];
    this.ajouterArticle = function (produit, quantite, price) { 
        let index = this.getArticle(produit);
        if (index == -1) this.liste.push(new LignePanier(produit, quantite, price));
        else this.liste[index].ajouterquantite(quantite);
    }
    this.getpricePanier = function () {
        let total = 0;
        for (let i = 0; i < this.liste.length; i++)
            total += this.liste[i].getpriceLigne();
        if (isNaN(total)) {
            return 0;
        }


        return total;
    }
    this.getArticle = function (produit) {
        for (let i = 0; i < this.liste.length; i++)
            if (produit == this.liste[i].getproduit()) return i;
        return -1;
    }
    this.supprimerArticle = function (produit) {
        let index = this.getArticle(produit);
        if (index > -1) this.liste.splice(index, 1);
    }
}

function LignePanier(produit, quantite, price) {
    this.produitArticle = produit;
    this.quantiteArticle = quantite;
    this.priceArticle = price;
    this.ajouterquantite = function (quantite) {
        this.quantiteArticle += quantite;
    }
    this.getpriceLigne = function () {
        let resultat = this.priceArticle * this.quantiteArticle;
        return resultat;
    }
    this.getproduit = function () {
        return this.produitArticle;
    } 
    console.log(this.quantiteArticle);
} 

/*----------------local storage-----------------*/


let panier = JSON.parse(localStorage.getItem('monpanier'));


displayPanier(panier['liste']);


/*------------------injection du html-----------------*/

function displayPanier(monPanier) {
    const element = document.getElementById("panier");

console.log(monPanier[0]["priceArticle"]);

// faire une boucle sur le panier  voir variable

let price = monPanier[0]["priceArticle"];
let quantite = monPanier[0]["quantiteArticle"];
let code = monPanier[0]["produitArticle"];

    let vueArticle = `
     
    <tr>
        <td>` + code +` </td>
        <td> ` + quantite + `</td>
        <td> `+ price + ` </td>
        <td> `+ quantite * price + ` </td>
        <td></td>
    </tr>

`
    element.insertAdjacentHTML('afterend', vueArticle);

//  fin de la boucle

};



// Formulaire de Commande

const afficherFormulaireHtml = () => {

    // Sléction de l'élément du DOM pour la position du formulaire

    const structureFormulaire = document.querySelector("#formulaire");
    const formulaireHtml = `
            <div id="formulaire-commande">
                <h2>Valider la commande en remplissant le formulaire</h2>
                <form method="post" action= "http://localhost:3000/api/teddies"  name="validation" >
                    <label for="nom">Nom :</label>
                    <input type="text" id ="lastName"  name="lastName" >
            
                    <label for="prénom">Prénom :</label>
                    <input type="text" id ="firstName" name="firstName" >
            
                    <label for="email">E-mail :</label>
                    <input type="text" id="email" name="email" >

                    <label for="adresse">Adresse :</label>
                    <input id ="adress" name="adress" maxlength = 50 ></input>

                    <label for="ville">Ville :</label>
                    <input type="text" id="city" name="city" >

                    <p style="color:red;" id="erreur"></p>
            
                    <button type="submit" id="envoyerCommande" class="btn-form" class="envoyer-commande">Valider votre commande</button>
                </form>
            </div>    
        `
            
        structureFormulaire.insertAdjacentHTML("afterend", formulaireHtml);
};


//appel function formulaire

afficherFormulaireHtml();



// Gestion du formulaire
const btnValidationFormulaire = document.querySelector("#envoyerCommande");

btnValidationFormulaire.addEventListener("click", (e) => {
    e.preventDefault();
    const validationFormulaire = true;
    let erreur;
    const inputs = document.getElementsByTagName("input");


    // Boucle pour remplir tous les champs du formulaire
    for (let n = 0; n < inputs.length; n++) {
        if (!inputs[n].value) {
            erreur = "Veuillez compléter tous les champs du formulaire";
            break;
        }
    };

    // Message d'erreur si le formulaire n'est pas rempli dans la totalité
    if (erreur) {
        document.querySelector("#erreur").innerHTML = erreur;
    };

    // Gestion des Regex selon les différentes valeurs du formulaire
    lastName = validation.lastName.value;
    regExpLastName = /^[a-zA-Z\s]{3,10}$/;
    if (regExpLastName.test(lastName) == false) {
        alert("NOM: Seuls les lettres en majuscules et minuscules sont acceptées. 3 caractères minimum");
        return false;
    }

    // Regex pour le champ prénom
    firstName = validation.firstName.value;
    regExFirstName = /^[a-zA-Z\s]{3,10}$/;
    if (regExFirstName.test(firstName) == false) {
        alert("PRENOM: Les caractères spéciaux et les chiffres ne sont pas acceptés.");
        return false;
    }

    // Regex pour le champ email
    email = validation.email.value;
    regExMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regExMail.test(email) == false) {
        alert("EMAIL: Les caractères @ et . sont obligatoires.");
        return false;
    }

    // Regex du champ adresse
    adress = validation.adress.value;
    regExAdress = /^[a-zA-Z0-9\s]{10,25}$/;
    if (regExAdress.test(adress) == false) {
        alert("ADRESSSE: Minimum de 10 caractères demandés.");
        return false;
    }

    // Regex pour le champ ville
    city = validation.city.value;
    regExCity = /^[a-zA-Z\s]{5,15}$/;
    if (regExCity.test(city) == false) {
        alert("VILLE: Les chiffres ne sont pas autorisés. Minimum 5 caractères.");
        return false;
    }

    if (validationFormulaire) { // Envoyer le formulaire si valide
        alert("formulaire envoyé");
    } else {
        e.preventDefault();
        alert("formulaire non envoyé");
    }


    /* Tableau produit à envoyer vers le serveur */
    let products = [];
    for (product of produitEnregistreDansLocalStorage) {
        products.push(product.id);
    }


    /* Objet contact à envoyer vers le serveur */
    let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#adress").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    };


    /* Requête POST pour envoyer les produits et contact vers le serveur */

    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ contact, products, prixTotal }),
    })
        .then((response) => response.json())
        .then((response) => {
            localStorage.setItem("orderId", response.orderId);
            console.log(response.orderId);
            window.location = "confirmation.html";
        })
})









