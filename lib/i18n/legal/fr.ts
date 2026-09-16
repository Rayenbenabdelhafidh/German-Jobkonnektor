import type { LegalDictionary } from "../types";

/**
 * Legal texts, French.
 *
 * NOTE FOR THE OPERATOR: structured placeholders, not legal advice. Have the
 * texts reviewed by a lawyer before launch and replace every "À COMPLÉTER"
 * placeholder. The Impressum is a German legal requirement; the French
 * version is a courtesy translation, and the German text remains binding.
 */

export const legalFr: LegalDictionary = {
  imprint: {
    title: "Mentions légales",
    intro:
      "Informations conformément au § 5 DDG (loi allemande sur les services numériques). Seule la version allemande fait foi ; cette traduction est fournie à titre de commodité.",
    sections: [
      {
        heading: "Fournisseur du service",
        lines: [
          "German Jobkonnektor",
          "Propriétaire : Mustapha Ben Belgacem",
          "Schneeheideanger 3",
          "80937 Munich",
          "Allemagne",
        ],
      },
      {
        heading: "Contact",
        contact: true,
      },
      {
        heading: "Numéro de TVA intracommunautaire",
        paragraphs: [
          "Numéro d'identification à la TVA conformément au § 27 a de la loi allemande sur la TVA : À COMPLÉTER avant la mise en ligne.",
          "Numéro fiscal : À COMPLÉTER avant la mise en ligne.",
        ],
      },
      {
        heading: "Responsable du contenu au sens du § 18 al. 2 MStV",
        lines: [
          "Mustapha Ben Belgacem",
          "Schneeheideanger 3",
          "80937 Munich",
          "Allemagne",
        ],
      },
      {
        heading: "Autorisation et autorité de contrôle",
        paragraphs: [
          "Autorité de contrôle compétente : À COMPLÉTER – indiquer l'autorité compétente pour le siège social.",
          "Si l'activité de placement requiert une autorisation ou un enregistrement, les informations correspondantes doivent être ajoutées ici.",
        ],
      },
      {
        heading: "Règlement des litiges au niveau de l'UE",
        paragraphs: [
          "La Commission européenne met à disposition une plateforme de règlement en ligne des litiges. Nous ne sommes ni tenus ni disposés à participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation.",
        ],
      },
      {
        heading: "Responsabilité concernant les contenus",
        paragraphs: [
          "En tant que fournisseur de services, nous sommes responsables de nos propres contenus sur ces pages conformément au droit commun, en application du § 7 al. 1 DDG. En revanche, conformément aux §§ 8 à 10 DDG, nous ne sommes pas tenus, en tant que fournisseur de services, de surveiller les informations de tiers transmises ou stockées, ni de rechercher des circonstances indiquant une activité illicite.",
          "Les obligations de retrait ou de blocage de l'utilisation d'informations en vertu du droit commun demeurent inchangées. Une responsabilité à ce titre n'est toutefois engagée qu'à compter de la connaissance d'une violation concrète du droit. Dès que de telles violations nous sont signalées, nous retirons ces contenus sans délai.",
        ],
      },
      {
        heading: "Responsabilité concernant les liens",
        paragraphs: [
          "Notre site contient des liens vers des sites externes de tiers, sur le contenu desquels nous n'avons aucune influence. Nous ne pouvons donc assumer aucune garantie pour ces contenus tiers. Le fournisseur ou l'exploitant des pages liées est toujours responsable de leur contenu.",
          "Les pages liées ont été vérifiées au moment de la mise en lien afin de détecter d'éventuelles violations du droit. Aucun contenu illicite n'était identifiable à ce moment-là. Dès que des violations nous sont signalées, nous retirons ces liens sans délai.",
        ],
      },
      {
        heading: "Droit d'auteur",
        paragraphs: [
          "Les contenus et œuvres créés par l'exploitant du site sur ces pages sont soumis au droit d'auteur allemand. La reproduction, la modification, la diffusion et toute forme d'exploitation en dehors des limites du droit d'auteur requièrent l'accord écrit de leur auteur ou créateur respectif.",
        ],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    updatedLabel: "Dernière mise à jour",
    updated: "Septembre 2026",
    intro:
      "La protection de vos données personnelles nous tient à cœur. Nous vous informons ci-après des données que nous collectons, des finalités pour lesquelles nous les traitons et des droits dont vous disposez. Le cadre applicable est le Règlement général sur la protection des données (RGPD) ainsi que la loi fédérale allemande sur la protection des données (BDSG).",
    disclaimer:
      "Remarque : ce texte est un modèle structuré. Merci de le faire vérifier par un juriste avant la mise en ligne et de compléter toutes les mentions marquées « À COMPLÉTER ».",
    sections: [
      {
        heading: "1. Responsable du traitement",
        paragraphs: [
          "Le responsable du traitement des données sur ce site est :",
        ],
        contact: true,
      },
      {
        heading: "2. Délégué à la protection des données",
        paragraphs: [
          "Si une désignation est obligatoire, vous pouvez joindre notre délégué à la protection des données à l'adresse suivante : À COMPLÉTER.",
        ],
      },
      {
        heading: "3. Données du formulaire de contact",
        paragraphs: [
          "Lorsque vous nous adressez un message via le formulaire de contact, nous traitons les données que vous avez indiquées (nom, adresse e-mail, numéro de téléphone, objet et contenu du message) afin de traiter votre demande et d'y répondre.",
          "La base légale est l'art. 6 § 1 point b du RGPD (mesures précontractuelles) ou l'art. 6 § 1 point f du RGPD (intérêt légitime à répondre aux demandes).",
          "Les données sont supprimées dès que votre demande a été définitivement traitée, sous réserve des délais légaux de conservation.",
        ],
      },
      {
        heading: "4. Données de la demande de personnel (employeurs)",
        paragraphs: [
          "Dans le cadre d'une demande de personnel, nous traitons le nom de l'entreprise, la personne de contact, les coordonnées, le secteur, le nombre de collaborateurs recherchés, la date de début souhaitée et votre message, afin d'examiner votre besoin en personnel et de vous soumettre une proposition.",
          "La base légale est l'art. 6 § 1 point b du RGPD. Aucune transmission à des tiers n'a lieu sans votre accord préalable explicite.",
        ],
      },
      {
        heading: "5. Données des candidats et documents téléversés",
        paragraphs: [
          "Lorsque vous postulez auprès de nous via le formulaire de candidature, nous traitons vos données d'identification (prénom et nom, adresse e-mail, numéro de téléphone ou WhatsApp, pays de résidence, nationalité, niveau d'allemand, secteur souhaité) ainsi que les documents que vous téléversez.",
          "Ces documents comprennent, selon le secteur, votre CV, une copie de la page principale de votre passeport, vos diplômes et certificats professionnels ainsi que – pour les candidatures dans le domaine du transport et de la logistique – votre permis de conduire étranger (recto et verso), votre carte de conducteur ou carte tachygraphe, et les justificatifs de votre expérience de conduite professionnelle.",
          "Une partie de ces informations peut relever de catégories particulières de données à caractère personnel au sens de l'art. 9 du RGPD. Le traitement repose donc exclusivement sur votre consentement explicite au titre de l'art. 6 § 1 point a et de l'art. 9 § 2 point a du RGPD, que vous donnez en cochant la case correspondante dans le formulaire de candidature.",
          "La finalité du traitement est la mise en relation en vue d'un emploi en Allemagne. Cela inclut la transmission de vos données et documents à des employeurs potentiels identifiés ainsi que, le cas échéant, aux autorités dans le cadre des procédures de visa et de reconnaissance des diplômes.",
          "Vous pouvez révoquer votre consentement à tout moment avec effet pour l'avenir. La licéité du traitement effectué jusqu'à la révocation n'en est pas affectée. Un simple message à l'adresse e-mail indiquée ci-dessus suffit.",
          "Durée de conservation : nous conservons les dossiers de candidature pendant la durée du processus de placement, puis au maximum 24 mois, sauf si vous avez expressément consenti à une conservation plus longue. Les données et documents sont ensuite supprimés.",
        ],
      },
      {
        heading: "6. Sécurité des documents téléversés",
        paragraphs: [
          "Les documents téléversés sont chiffrés et conservés dans un espace de stockage non accessible au public. Seuls des collaborateurs autorisés y ont accès après authentification ; la consultation s'effectue via des liens signés à durée de vie courte. À aucun moment les documents ne sont accessibles via une adresse publique.",
          "La transmission sur ce site est intégralement chiffrée via HTTPS (TLS).",
        ],
      },
      {
        heading: "7. Cookies et gestion du consentement",
        paragraphs: [
          "Nous utilisons des cookies techniquement nécessaires ou des techniques de stockage comparables afin de mémoriser votre choix de langue et votre décision concernant les cookies. La base légale est le § 25 al. 2 TDDDG combiné à l'art. 6 § 1 point f du RGPD.",
          "Tous les contenus non nécessaires – en particulier la carte intégrée sur la page Contact – ne sont chargés qu'après votre consentement explicite. La base légale est le § 25 al. 1 TDDDG combiné à l'art. 6 § 1 point a du RGPD.",
          "Vous pouvez modifier ou révoquer votre consentement à tout moment via le lien « Paramètres des cookies » en pied de page.",
          "Aucun traçage ni aucune analyse d'audience n'est mis en œuvre sur ce site.",
        ],
      },
      {
        heading: "8. Google Maps",
        paragraphs: [
          "Sur la page Contact, nous intégrons une carte du service Google Maps. Le fournisseur est Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande.",
          "La carte n'est chargée qu'après votre consentement actif. Ce n'est qu'à ce moment qu'une connexion est établie avec les serveurs de Google et que votre adresse IP, ainsi qu'éventuellement d'autres données, lui sont transmises. Un transfert vers des pays tiers ne peut être exclu.",
          "Pour plus d'informations, veuillez consulter la politique de confidentialité de Google.",
        ],
      },
      {
        heading: "9. Fichiers journaux du serveur",
        paragraphs: [
          "L'hébergeur de ce site collecte et conserve automatiquement des informations dans des fichiers journaux que votre navigateur transmet : type et version du navigateur, système d'exploitation utilisé, URL de provenance, nom d'hôte de l'ordinateur accédant au site, heure de la requête et adresse IP.",
          "Ces données ne sont pas rapprochées d'autres sources de données. La base légale est l'art. 6 § 1 point f du RGPD (intérêt légitime à une exploitation techniquement sûre et sans erreur).",
          "Hébergeur : À COMPLÉTER avant la mise en ligne. Un contrat de sous-traitance au sens de l'art. 28 du RGPD est conclu avec le prestataire.",
        ],
      },
      {
        heading: "10. Destinataires et sous-traitants",
        paragraphs: [
          "Vos données ne sont transmises que dans la mesure où cela est nécessaire à la finalité de placement, où vous y avez consenti, ou lorsqu'une obligation légale l'impose.",
          "Les destinataires possibles sont des employeurs potentiels en Allemagne, les représentations allemandes à l'étranger et les services des étrangers, les organismes compétents en matière de reconnaissance des diplômes, ainsi que nos prestataires techniques d'hébergement et de stockage documentaire.",
          "Des contrats conformes à l'art. 28 du RGPD sont conclus avec l'ensemble des sous-traitants.",
        ],
      },
      {
        heading: "11. Vos droits",
        paragraphs: [
          "En tant que personne concernée, vous disposez des droits suivants :",
        ],
        list: [
          "Droit d'accès aux données vous concernant (art. 15 du RGPD)",
          "Droit de rectification des données inexactes (art. 16 du RGPD)",
          "Droit à l'effacement de vos données (art. 17 du RGPD)",
          "Droit à la limitation du traitement (art. 18 du RGPD)",
          "Droit à la portabilité des données (art. 20 du RGPD)",
          "Droit d'opposition au traitement (art. 21 du RGPD)",
          "Droit de retirer un consentement donné, avec effet pour l'avenir (art. 7 § 3 du RGPD)",
        ],
        after: [
          "Pour exercer vos droits, un simple message à l'adresse e-mail indiquée ci-dessus suffit.",
          "Indépendamment de cela, vous disposez d'un droit de réclamation auprès d'une autorité de contrôle en matière de protection des données (art. 77 du RGPD). Est en principe compétente l'autorité de votre lieu de résidence habituelle ou celle du siège du responsable du traitement. Pour notre siège, il s'agit de l'Office bavarois de contrôle de la protection des données.",
        ],
      },
      {
        heading: "12. Modifications de la présente politique",
        paragraphs: [
          "Nous adaptons la présente politique de confidentialité dès que des évolutions de nos prestations ou du cadre juridique l'exigent. La version publiée sur cette page fait foi à tout moment.",
        ],
      },
    ],
  },
};
