import Svgs from '../Svgs';

// Liste des pays
const countries = [
  {
    id: 'cg',
    name: '🇨🇬 République du Congo',
    flag: '/static/flags/cg.png',
    currency: 'XAF',
  },
  {
    id: 'cam',
    name: '🇨🇲 Caméroun',
    flag: '/static/flags/cam.png',
    currency: 'XAF',
  },
  {
    id: 'sen',
    name: '🇸🇳 Sénégal',
    flag: '/static/flags/sen.png',
    currency: 'XOF',
  },
  {
    id: 'civ',
    name: "🇨🇮 Côte d'ivoire",
    flag: '/static/flags/civ.png',
    currency: 'XOF',
  },
  {
    id: 'ru',
    name: '🇷🇺 Fédération de Russie',
    flag: '/static/flags/ru.png',
    currency: 'RUB',
  },
  {
    id: 'rca',
    name: '🇨🇫 République centrafricaine',
    flag: '/static/flags/rca.png',
    currency: 'XAF',
  },
  {
    id: 'gab',
    name: '🇬🇦 Gabon',
    flag: '/static/flags/gab.png',
    currency: 'XAF',
  },
  {
    id: 'tchad',
    name: '🇹🇩 Tchad',
    flag: '/static/flags/tchad.png',
    currency: 'XAF',
  },
  {
    id: 'mali',
    name: '🇲🇱 Mali',
    flag: '/static/flags/mali.png',
    currency: 'XOF',
  },
  {
    id: 'gib',
    name: '🇬🇼 Guinée bissau',
    flag: '/static/flags/gib.png',
    currency: 'XOF',
  },
  {
    id: 'buf',
    name: '🇧🇫 Burkina Fasso',
    flag: '/static/flags/buf.png',
    currency: 'XOF',
  },
  { id: 'nr', name: '🇳🇪 Niger', flag: '/static/flags/nr.png', currency: 'XOF' },
];

// Utilitaire debounce pour éviter les appels API trop fréquents

const Convertisseur = () => {
  // Etats principaux

  // Pour éviter de fetch trop souvent, on mémorise les taux déjà récupérés

  // Récupération du taux d'échange (optimisé avec cache)

  // Met à jour le montant reçu en fonction du montant envoyé et du taux

  // Met à jour le montant envoyé en fonction du montant reçu et du taux (pour l'input inverse)

  // Lors d'un changement de pays ou au montage, on récupère le taux et on met à jour le montant reçu

  // Debounce la mise à jour du montant reçu lors de la saisie

  // Debounce la mise à jour du montant envoyé lors de la saisie inverse

  // Gestion de la saisie du montant à envoyer

  // Gestion de la saisie du montant à recevoir (input inverse)

  // Gestion du changement de pays d'envoi

  // Gestion du changement de pays de réception

  // Inversion des pays et des montants

  // Pour éviter de recalculer inutilement

  return (
    <div className='transfertConvert__convert--wrapper'>
      <div className='transfertConvert__convert--list'>
        {/* Bloc montant à envoyer */}
        <div className='transfertConvert__convert--list__input'>
          <div className='transfertConvert__convert--list__input--left'>
            <label htmlFor='send'>Montant à envoyer</label>
            <div className='block'>
              <div>{'jdhjbh'}</div>
              <input
                type='tel'
                placeholder='Vous envoyez'
                autoComplete='off'
                inputMode='decimal'
              />
            </div>
          </div>
          <div className='transfertConvert__convert--list__input--right'>
            <select>
              {countries.map(el => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type='button' aria-label='Inverser les devises'>
          <Svgs name='exchange' />
        </button>
        {/* Bloc montant à recevoir */}
        <div className='transfertConvert__convert--list__input'>
          <div className='transfertConvert__convert--list__input--left'>
            <label htmlFor='receive'>Montant à recevoir</label>
            <div className='block'>
              <div>{'nksn'}</div>
              <input
                type='tel'
                placeholder='Vous recevez'
                autoComplete='off'
                inputMode='decimal'
              />
            </div>
          </div>
          <div className='transfertConvert__convert--list__input--right'>
            <select>
              {countries.map(el => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='transfertConvert__convert--content'>
        <div>
          <span>{`Taux d'échange :`}</span>
          {/* <p>{loading ? 'Chargement...' : tauxAffichage}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Convertisseur;
