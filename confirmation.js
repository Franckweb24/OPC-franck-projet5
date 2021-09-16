

// Récupération de l'id de la commande provenant du serveur que l'on a enregistré dans le localstorage
const orderId = localStorage.getItem("orderId");
console.log(orderId);

// Récupérer le prix total de la commande
const prixTotal = localStorage.getItem("prixTotal");
console.log(prixTotal);

// Sélection du DOM + Injection de la structure HTML

const confCommande = document.querySelector("#confirmation");
const validateCommande = `
<div class="recap-commande">
    <h1>Récapitulatif de votre commande</h1>
    <div>
        <p class="p-confirm">Merçi pour votre commande numéro <span class="bold">${orderId}</span> a bien été enregistrée.</p>
        <p class="p-confirm">Le montant total de votre commande est de: <span class="bold">${prixTotal}€</span>.</p>
        <p class="p-confirm">Au plaisir de vous revoir très prochainement sur notre site.</p>
    </div>
</div>
`;
confCommande.insertAdjacentHTML("afterbegin", validateCommande);

// Suppression du localstorage une fois que la commande est validée

function deleteKeyLocalStorage(key){
    localStorage.removeItem(key);
};

deleteKeyLocalStorage("prixTotal");
deleteKeyLocalStorage("tedy");
deleteKeyLocalStorage("orderId");