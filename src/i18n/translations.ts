export const languages = {
  pl: 'Polski',
  en: 'English',
  ru: 'Русский',
};

export const defaultLang = 'pl';

export const ui = {
  pl: {
    'nav.home': 'Strona główna',
    'nav.about': 'O nas',
    'nav.rooms': 'Pokoje i domki',
    'nav.attractions': 'Atrakcje',
    'nav.pricing': 'Cennik',
    'nav.contact': 'Kontakt',
    'nav.bookNow': 'Zarezerwuj',

    'hero.title': 'Witaj w Marianówce',
    'hero.subtitle': 'Twój azyl spokoju i natury w sercu gór',
    'hero.cta': 'Sprawdź dostępność',

    'rooms.sectionTitle': 'Nasze Pokoje i Domki',
    'rooms.sectionDesc': 'Wybierz przestrzeń idealną dla siebie i swojej rodziny',
    'room.from': 'od',
    'room.currency': 'zł / doba',
    'room.check': 'Sprawdź',

    'contact.heading': 'Porozmawiajmy o Twoim pobycie',
    'contact.desc':
      'Masz pytania o wolne terminy? Najszybciej odpowiadamy telefonicznie lub bezpośrednio przez wiadomości na Facebooku.',
    'contact.phone': 'Tel',
    'contact.email': 'Email',
    'contact.address': 'Lokalizacja',

    'form.name': 'Twoje Imię',
    'form.namePlaceholder': 'Jan Kowalski',
    'form.email': 'Twój Adres E-mail',
    'form.emailPlaceholder': 'jan@example.com',
    'form.message': 'Wiadomość',
    'form.messagePlaceholder': 'Dzień dobry, interesuje mnie termin...',
    'form.consent': 'Akceptuję politykę prywatności',
    'form.submit': 'Wyślij zapytanie',

    'actions.rooms': 'Zobacz oferty pokoi',
    'actions.call': 'Zadzwoń do nas',

    'site.title': 'Marianówka - Agroturystyka',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.rooms': 'Rooms & Cabins',
    'nav.attractions': 'Attractions',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.bookNow': 'Book Now',

    'hero.title': 'Welcome to Marianówka',
    'hero.subtitle': 'Your sanctuary of peace and nature in the heart of the mountains',
    'hero.cta': 'Check Availability',

    'rooms.sectionTitle': 'Our Rooms & Cabins',
    'rooms.sectionDesc': 'Choose the perfect space for you and your family',
    'room.from': 'from',
    'room.currency': 'PLN / night',
    'room.check': 'Check',

    'contact.heading': 'Let’s talk about your stay',
    'contact.desc':
      'Have questions about available dates? We respond fastest by phone or directly via Facebook messages.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Location',

    'form.name': 'Your Name',
    'form.namePlaceholder': 'John Doe',
    'form.email': 'Your E-mail Address',
    'form.emailPlaceholder': 'john@example.com',
    'form.message': 'Message',
    'form.messagePlaceholder': 'Hello, I am interested in dates...',
    'form.consent': 'I accept the privacy policy',
    'form.submit': 'Send Inquiry',

    'actions.rooms': 'View room offers',
    'actions.call': 'Call us',

    'site.title': 'Marianówka - Farmstay',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.rooms': 'Номера и домики',
    'nav.attractions': 'Достопримечательности',
    'nav.pricing': 'Цены',
    'nav.contact': 'Контакты',
    'nav.bookNow': 'Забронировать',

    'hero.title': 'Добро пожаловать в Маряновку',
    'hero.subtitle': 'Ваш островок уединения и природы в сердце гор',
    'hero.cta': 'Проверить доступность',

    'rooms.sectionTitle': 'Наши номера и домики',
    'rooms.sectionDesc': 'Выберите идеальное пространство для себя и своей семьи',
    'room.from': 'от',
    'room.currency': 'PLN / ночь',
    'room.check': 'Смотреть',

    'contact.heading': 'Давайте обсудим ваше пребывание',
    'contact.desc':
      'Есть вопросы о свободных датах? Быстрее всего мы отвечаем по телефону или через сообщения в Facebook.',
    'contact.phone': 'Тел',
    'contact.email': 'Email',
    'contact.address': 'Расположение',

    'form.name': 'Ваше имя',
    'form.namePlaceholder': 'Иван Иванов',
    'form.email': 'Ваш адрес электронной почты',
    'form.emailPlaceholder': 'ivan@example.com',
    'form.message': 'Сообщение',
    'form.messagePlaceholder': 'Здравствуйте, меня интересуют даты...',
    'form.consent': 'Я принимаю политику конфиденциальности',
    'form.submit': 'Отправить запрос',

    'actions.rooms': 'Посмотреть номера',
    'actions.call': 'Позвонить нам',

    'site.title': 'Маряновка - Агротуризм',
  },
};

export const useTranslations = (lang: keyof typeof ui | string | undefined) => {
  const safeLang = (lang && lang in ui ? lang : defaultLang) as keyof typeof ui;

  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    const currentUi = ui[safeLang] as Record<string, string>;
    const defaultUi = ui[defaultLang] as Record<string, string>;

    return currentUi[key] || defaultUi[key] || key;
  };
};
