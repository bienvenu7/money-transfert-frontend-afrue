import React from "react";

type Props = {};

const Faq = (props: Props) => {
  return (
    <div className="main__faq">
      <div className="main__faq--wrapper">
        <h2>FAQ</h2>
        <div className="main__faq--content">
          <div className="main__faq--content__left">
            <div className="main__faq--content__left--title">
              <span>01</span>
              <h3>Comment effectuer une transaction via AfruE ?</h3>
            </div>
          </div>
          <div className="main__faq--content__right">
            <p>
              Pour effectuer une transaction sur la plateforme de transfert
              d’argent Afru-exchange, suivez ces étapes: 1. Créez un compte (si
              ce n’est pas encore fait) Accédez au site web ou à l’application
              Afruexchange. Inscrivez-vous en renseignant vos informations
              personnelles : Vérifiez votre compte en confirmant votre adresse
              e-mail ou numéro de téléphone. 2. Connectez-vous à votre compte
              Entrez vos identifiants (nom d’utilisateur/e-mail et mot de
              passe). 3.Cliquez sur l’onglet “TRANSATION”, choisissez le type
              puis convertissez le montant souhaite  Indiquez le pays, la
              devise,la somme que vous souhaitez envoyer. Vérifiez le taux de
              change proposé et les frais de transaction. 4. Ajoutez les
              informations de paiement,Confirmez la transaction Sélectionnez la
              méthode de paiement : En espece Virement bancaire Depot mobile
              money. Ajoutez vos coordonnées bancaires ou mobile money
              Fournissez les informations de la personne qui recevra l’argent :
              Vérifiez que ces informations sont correctes. Revoyez les détails
              de la transaction. Confirmez le transfert après validation des
              informations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
