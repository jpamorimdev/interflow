export interface CountryCode {
  code: string;
  name: string;
  dial_code: string;
  local_name?: string; // Nome local do país
}

export const countryCodes: CountryCode[] = [
  { code: 'AF', name: 'Afghanistan', dial_code: '+93', local_name: 'افغانستان' },
  { code: 'ZA', name: 'South Africa', dial_code: '+27', local_name: 'South Africa' },
  { code: 'AL', name: 'Albania', dial_code: '+355', local_name: 'Shqipëria' },
  { code: 'DE', name: 'Germany', dial_code: '+49', local_name: 'Deutschland' },
  { code: 'AD', name: 'Andorra', dial_code: '+376', local_name: 'Andorra' },
  { code: 'AO', name: 'Angola', dial_code: '+244', local_name: 'Angola' },
  { code: 'AI', name: 'Anguilla', dial_code: '+1264', local_name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica', dial_code: '+672', local_name: 'Antarctica' },
  { code: 'AG', name: 'Antigua and Barbuda', dial_code: '+1268', local_name: 'Antigua and Barbuda' },
  { code: 'SA', name: 'Saudi Arabia', dial_code: '+966', local_name: 'المملكة العربية السعودية' },
  { code: 'DZ', name: 'Algeria', dial_code: '+213', local_name: 'الجزائر' },
  { code: 'AR', name: 'Argentina', dial_code: '+54', local_name: 'Argentina' },
  { code: 'AM', name: 'Armenia', dial_code: '+374', local_name: 'Հայաստան' },
  { code: 'AW', name: 'Aruba', dial_code: '+297', local_name: 'Aruba' },
  { code: 'AU', name: 'Australia', dial_code: '+61', local_name: 'Australia' },
  { code: 'AT', name: 'Austria', dial_code: '+43', local_name: 'Österreich' },
  { code: 'AZ', name: 'Azerbaijan', dial_code: '+994', local_name: 'Azərbaycan' },
  { code: 'BS', name: 'Bahamas', dial_code: '+1242', local_name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain', dial_code: '+973', local_name: 'البحرين' },
  { code: 'BD', name: 'Bangladesh', dial_code: '+880', local_name: 'বাংলাদেশ' },
  { code: 'BB', name: 'Barbados', dial_code: '+1246', local_name: 'Barbados' },
  { code: 'BE', name: 'Belgium', dial_code: '+32', local_name: 'België' },
  { code: 'BZ', name: 'Belize', dial_code: '+501', local_name: 'Belize' },
  { code: 'BJ', name: 'Benin', dial_code: '+229', local_name: 'Bénin' },
  { code: 'BM', name: 'Bermuda', dial_code: '+1441', local_name: 'Bermuda' },
  { code: 'BY', name: 'Belarus', dial_code: '+375', local_name: 'Беларусь' },
  { code: 'BO', name: 'Bolivia', dial_code: '+591', local_name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dial_code: '+387', local_name: 'Bosna i Hercegovina' },
  { code: 'BW', name: 'Botswana', dial_code: '+267', local_name: 'Botswana' },
  { code: 'BR', name: 'Brazil', dial_code: '+55', local_name: 'Brasil' },
  { code: 'BN', name: 'Brunei', dial_code: '+673', local_name: 'بروني' },
  { code: 'BG', name: 'Bulgaria', dial_code: '+359', local_name: 'България' },
  { code: 'BF', name: 'Burkina Faso', dial_code: '+226', local_name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi', dial_code: '+257', local_name: 'Burundi' },
  { code: 'BT', name: 'Bhutan', dial_code: '+975', local_name: 'འབྲུག་ཡུལ་' },
  { code: 'CV', name: 'Cape Verde', dial_code: '+238', local_name: 'Cabo Verde' },
  { code: 'CM', name: 'Cameroon', dial_code: '+237', local_name: 'Cameroun' },
  { code: 'KH', name: 'Cambodia', dial_code: '+855', local_name: 'កម្ពុជា' },
  { code: 'CA', name: 'Canada', dial_code: '+1', local_name: 'Canada' },
  { code: 'QA', name: 'Qatar', dial_code: '+974', local_name: 'قطر' },
  { code: 'KZ', name: 'Kazakhstan', dial_code: '+7', local_name: 'Қазақстан' },
  { code: 'TD', name: 'Chad', dial_code: '+235', local_name: 'Tchad' },
  { code: 'CL', name: 'Chile', dial_code: '+56', local_name: 'Chile' },
  { code: 'CN', name: 'China', dial_code: '+86', local_name: '中国' },
  { code: 'CY', name: 'Cyprus', dial_code: '+357', local_name: 'Κύπρος' },
  { code: 'CO', name: 'Colombia', dial_code: '+57', local_name: 'Colombia' },
  { code: 'KM', name: 'Comoros', dial_code: '+269', local_name: 'جزر القمر' },
  { code: 'CG', name: 'Congo', dial_code: '+242', local_name: 'Congo' },
  { code: 'CD', name: 'Congo (DRC)', dial_code: '+243', local_name: 'Congo (RDC)' },
  { code: 'KR', name: 'South Korea', dial_code: '+82', local_name: '대한민국' },
  { code: 'KP', name: 'North Korea', dial_code: '+850', local_name: '조선민주주의인민공화국' },
  { code: 'CI', name: 'Ivory Coast', dial_code: '+225', local_name: 'Côte d\'Ivoire' },
  { code: 'CR', name: 'Costa Rica', dial_code: '+506', local_name: 'Costa Rica' },
  { code: 'HR', name: 'Croatia', dial_code: '+385', local_name: 'Hrvatska' },
  { code: 'CU', name: 'Cuba', dial_code: '+53', local_name: 'Cuba' },
  { code: 'DK', name: 'Denmark', dial_code: '+45', local_name: 'Danmark' },
  { code: 'DJ', name: 'Djibouti', dial_code: '+253', local_name: 'Djibouti' },
  { code: 'DM', name: 'Dominica', dial_code: '+1767', local_name: 'Dominica' },
  { code: 'EG', name: 'Egypt', dial_code: '+20', local_name: 'مصر' },
  { code: 'SV', name: 'El Salvador', dial_code: '+503', local_name: 'El Salvador' },
  { code: 'AE', name: 'United Arab Emirates', dial_code: '+971', local_name: 'الإمارات العربية المتحدة' },
  { code: 'EC', name: 'Ecuador', dial_code: '+593', local_name: 'Ecuador' },
  { code: 'ER', name: 'Eritrea', dial_code: '+291', local_name: 'ኤርትራ' },
  { code: 'SK', name: 'Slovakia', dial_code: '+421', local_name: 'Slovensko' },
  { code: 'SI', name: 'Slovenia', dial_code: '+386', local_name: 'Slovenija' },
  { code: 'ES', name: 'Spain', dial_code: '+34', local_name: 'España' },
  { code: 'US', name: 'United States', dial_code: '+1', local_name: 'United States' },
  { code: 'EE', name: 'Estonia', dial_code: '+372', local_name: 'Eesti' },
  { code: 'ET', name: 'Ethiopia', dial_code: '+251', local_name: 'ኢትዮጵያ' },
  { code: 'FJ', name: 'Fiji', dial_code: '+679', local_name: 'Fiji' },
  { code: 'PH', name: 'Philippines', dial_code: '+63', local_name: 'Pilipinas' },
  { code: 'FI', name: 'Finland', dial_code: '+358', local_name: 'Suomi' },
  { code: 'FR', name: 'France', dial_code: '+33', local_name: 'France' },
  { code: 'GA', name: 'Gabon', dial_code: '+241', local_name: 'Gabon' },
  { code: 'GM', name: 'Gambia', dial_code: '+220', local_name: 'Gambia' },
  { code: 'GH', name: 'Ghana', dial_code: '+233', local_name: 'Ghana' },
  { code: 'GE', name: 'Georgia', dial_code: '+995', local_name: 'საქართველო' },
  { code: 'GI', name: 'Gibraltar', dial_code: '+350', local_name: 'Gibraltar' },
  { code: 'GD', name: 'Grenada', dial_code: '+1473', local_name: 'Grenada' },
  { code: 'GR', name: 'Greece', dial_code: '+30', local_name: 'Ελλάδα' },
  { code: 'GL', name: 'Greenland', dial_code: '+299', local_name: 'Kalaallit Nunaat' },
  { code: 'GP', name: 'Guadeloupe', dial_code: '+590', local_name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam', dial_code: '+1671', local_name: 'Guam' },
  { code: 'GT', name: 'Guatemala', dial_code: '+502', local_name: 'Guatemala' },
  { code: 'GG', name: 'Guernsey', dial_code: '+44', local_name: 'Guernsey' },
  { code: 'GY', name: 'Guyana', dial_code: '+592', local_name: 'Guyana' },
  { code: 'GF', name: 'French Guiana', dial_code: '+594', local_name: 'Guyane française' },
  { code: 'GN', name: 'Guinea', dial_code: '+224', local_name: 'Guinée' },
  { code: 'GQ', name: 'Equatorial Guinea', dial_code: '+240', local_name: 'Guinea Ecuatorial' },
  { code: 'GW', name: 'Guinea-Bissau', dial_code: '+245', local_name: 'Guiné-Bissau' },
  { code: 'HT', name: 'Haiti', dial_code: '+509', local_name: 'Haïti' },
  { code: 'NL', name: 'Netherlands', dial_code: '+31', local_name: 'Nederland' },
  { code: 'HN', name: 'Honduras', dial_code: '+504', local_name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong', dial_code: '+852', local_name: '香港' },
  { code: 'HU', name: 'Hungary', dial_code: '+36', local_name: 'Magyarország' },
  { code: 'YE', name: 'Yemen', dial_code: '+967', local_name: 'اليمن' },
  { code: 'IN', name: 'India', dial_code: '+91', local_name: 'भारत' },
  { code: 'ID', name: 'Indonesia', dial_code: '+62', local_name: 'Indonesia' },
  { code: 'IQ', name: 'Iraq', dial_code: '+964', local_name: 'العراق' },
  { code: 'IR', name: 'Iran', dial_code: '+98', local_name: 'ایران' },
  { code: 'IE', name: 'Ireland', dial_code: '+353', local_name: 'Éire' },
  { code: 'IS', name: 'Iceland', dial_code: '+354', local_name: 'Ísland' },
  { code: 'IL', name: 'Israel', dial_code: '+972', local_name: 'ישראל' },
  { code: 'IT', name: 'Italy', dial_code: '+39', local_name: 'Italia' },
  { code: 'JM', name: 'Jamaica', dial_code: '+1876', local_name: 'Jamaica' },
  { code: 'JP', name: 'Japan', dial_code: '+81', local_name: '日本' },
  { code: 'JE', name: 'Jersey', dial_code: '+44', local_name: 'Jersey' },
  { code: 'JO', name: 'Jordan', dial_code: '+962', local_name: 'الأردن' },
  { code: 'KW', name: 'Kuwait', dial_code: '+965', local_name: 'الكويت' },
  { code: 'LA', name: 'Laos', dial_code: '+856', local_name: 'ປະເທດລາວ' },
  { code: 'LS', name: 'Lesotho', dial_code: '+266', local_name: 'Lesotho' },
  { code: 'LV', name: 'Latvia', dial_code: '+371', local_name: 'Latvija' },
  { code: 'LB', name: 'Lebanon', dial_code: '+961', local_name: 'لبنان' },
  { code: 'LR', name: 'Liberia', dial_code: '+231', local_name: 'Liberia' },
  { code: 'LY', name: 'Libya', dial_code: '+218', local_name: 'ليبيا' },
  { code: 'LI', name: 'Liechtenstein', dial_code: '+423', local_name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania', dial_code: '+370', local_name: 'Lietuva' },
  { code: 'LU', name: 'Luxembourg', dial_code: '+352', local_name: 'Luxembourg' },
  { code: 'MO', name: 'Macau', dial_code: '+853', local_name: '澳門' },
  { code: 'MK', name: 'North Macedonia', dial_code: '+389', local_name: 'Северна Македонија' },
  { code: 'MG', name: 'Madagascar', dial_code: '+261', local_name: 'Madagasikara' },
  { code: 'MY', name: 'Malaysia', dial_code: '+60', local_name: 'Malaysia' },
  { code: 'MW', name: 'Malawi', dial_code: '+265', local_name: 'Malawi' },
  { code: 'MV', name: 'Maldives', dial_code: '+960', local_name: 'Maldives' },
  { code: 'ML', name: 'Mali', dial_code: '+223', local_name: 'Mali' },
  { code: 'MT', name: 'Malta', dial_code: '+356', local_name: 'Malta' },
  { code: 'MA', name: 'Morocco', dial_code: '+212', local_name: 'المغرب' },
  { code: 'MQ', name: 'Martinique', dial_code: '+596', local_name: 'Martinique' },
  { code: 'MU', name: 'Mauritius', dial_code: '+230', local_name: 'Maurice' },
  { code: 'MR', name: 'Mauritania', dial_code: '+222', local_name: 'موريتانيا' },
  { code: 'YT', name: 'Mayotte', dial_code: '+262', local_name: 'Mayotte' },
  { code: 'MX', name: 'Mexico', dial_code: '+52', local_name: 'México' },
  { code: 'MM', name: 'Myanmar', dial_code: '+95', local_name: 'မြန်မာ' },
  { code: 'FM', name: 'Micronesia', dial_code: '+691', local_name: 'Micronesia' },
  { code: 'MZ', name: 'Mozambique', dial_code: '+258', local_name: 'Moçambique' },
  { code: 'MD', name: 'Moldova', dial_code: '+373', local_name: 'Moldova' },
  { code: 'MC', name: 'Monaco', dial_code: '+377', local_name: 'Monaco' },
  { code: 'MN', name: 'Mongolia', dial_code: '+976', local_name: 'Монгол Улс' },
  { code: 'ME', name: 'Montenegro', dial_code: '+382', local_name: 'Crna Gora' },
  { code: 'MS', name: 'Montserrat', dial_code: '+1664', local_name: 'Montserrat' },
  { code: 'NA', name: 'Namibia', dial_code: '+264', local_name: 'Namibia' },
  { code: 'NR', name: 'Nauru', dial_code: '+674', local_name: 'Nauru' },
  { code: 'NP', name: 'Nepal', dial_code: '+977', local_name: 'नेपाल' },
  { code: 'NI', name: 'Nicaragua', dial_code: '+505', local_name: 'Nicaragua' },
  { code: 'NE', name: 'Niger', dial_code: '+227', local_name: 'Niger' },
  { code: 'NG', name: 'Nigeria', dial_code: '+234', local_name: 'Nigeria' },
  { code: 'NU', name: 'Niue', dial_code: '+683', local_name: 'Niue' },
  { code: 'NO', name: 'Norway', dial_code: '+47', local_name: 'Norge' },
  { code: 'NC', name: 'New Caledonia', dial_code: '+687', local_name: 'Nouvelle-Calédonie' },
  { code: 'NZ', name: 'New Zealand', dial_code: '+64', local_name: 'New Zealand' },
  { code: 'OM', name: 'Oman', dial_code: '+968', local_name: 'عمان' },
  { code: 'PW', name: 'Palau', dial_code: '+680', local_name: 'Palau' },
  { code: 'PA', name: 'Panama', dial_code: '+507', local_name: 'Panamá' },
  { code: 'PG', name: 'Papua New Guinea', dial_code: '+675', local_name: 'Papua Niugini' },
  { code: 'PK', name: 'Pakistan', dial_code: '+92', local_name: 'پاکستان' },
  { code: 'PY', name: 'Paraguay', dial_code: '+595', local_name: 'Paraguay' },
  { code: 'PE', name: 'Peru', dial_code: '+51', local_name: 'Perú' },
  { code: 'PF', name: 'French Polynesia', dial_code: '+689', local_name: 'Polynésie française' },
  { code: 'PL', name: 'Poland', dial_code: '+48', local_name: 'Polska' },
  { code: 'PR', name: 'Puerto Rico', dial_code: '+1', local_name: 'Puerto Rico' },
  { code: 'PT', name: 'Portugal', dial_code: '+351', local_name: 'Portugal' },
  { code: 'KE', name: 'Kenya', dial_code: '+254', local_name: 'Kenya' },
  { code: 'KG', name: 'Kyrgyzstan', dial_code: '+996', local_name: 'Кыргызстан' },
  { code: 'KI', name: 'Kiribati', dial_code: '+686', local_name: 'Kiribati' },
  { code: 'GB', name: 'United Kingdom', dial_code: '+44', local_name: 'United Kingdom' },
  { code: 'CF', name: 'Central African Republic', dial_code: '+236', local_name: 'République centrafricaine' },
  { code: 'CZ', name: 'Czech Republic', dial_code: '+420', local_name: 'Česká republika' },
  { code: 'DO', name: 'Dominican Republic', dial_code: '+1', local_name: 'República Dominicana' },
  { code: 'RE', name: 'Réunion', dial_code: '+262', local_name: 'La Réunion' },
  { code: 'RO', name: 'Romania', dial_code: '+40', local_name: 'România' },
  { code: 'RW', name: 'Rwanda', dial_code: '+250', local_name: 'Rwanda' },
  { code: 'RU', name: 'Russia', dial_code: '+7', local_name: 'Россия' },
  { code: 'EH', name: 'Western Sahara', dial_code: '+212', local_name: 'الصحراء الغربية' },
  { code: 'WS', name: 'Samoa', dial_code: '+685', local_name: 'Samoa' },
  { code: 'AS', name: 'American Samoa', dial_code: '+1684', local_name: 'American Samoa' },
  { code: 'SM', name: 'San Marino', dial_code: '+378', local_name: 'San Marino' },
  { code: 'SH', name: 'Saint Helena', dial_code: '+290', local_name: 'Saint Helena' },
  { code: 'LC', name: 'Saint Lucia', dial_code: '+1758', local_name: 'Saint Lucia' },
  { code: 'BL', name: 'Saint Barthélemy', dial_code: '+590', local_name: 'Saint-Barthélemy' },
  { code: 'KN', name: 'Saint Kitts and Nevis', dial_code: '+1869', local_name: 'Saint Kitts and Nevis' },
  { code: 'MF', name: 'Saint Martin', dial_code: '+590', local_name: 'Saint-Martin' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', dial_code: '+508', local_name: 'Saint-Pierre-et-Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', dial_code: '+1784', local_name: 'Saint Vincent and the Grenadines' },
  { code: 'ST', name: 'Sao Tome and Principe', dial_code: '+239', local_name: 'São Tomé e Príncipe' },
  { code: 'SN', name: 'Senegal', dial_code: '+221', local_name: 'Sénégal' },
  { code: 'SL', name: 'Sierra Leone', dial_code: '+232', local_name: 'Sierra Leone' },
  { code: 'RS', name: 'Serbia', dial_code: '+381', local_name: 'Србија' },
  { code: 'SC', name: 'Seychelles', dial_code: '+248', local_name: 'Seychelles' },
  { code: 'SG', name: 'Singapore', dial_code: '+65', local_name: 'Singapore' },
  { code: 'SY', name: 'Syria', dial_code: '+963', local_name: 'سوريا' },
  { code: 'SO', name: 'Somalia', dial_code: '+252', local_name: 'Soomaaliya' },
  { code: 'LK', name: 'Sri Lanka', dial_code: '+94', local_name: 'ශ්‍රී ලංකාව' },
  { code: 'SZ', name: 'Eswatini', dial_code: '+268', local_name: 'Eswatini' },
  { code: 'SD', name: 'Sudan', dial_code: '+249', local_name: 'السودان' },
  { code: 'SS', name: 'South Sudan', dial_code: '+211', local_name: 'جنوب السودان' },
  { code: 'SE', name: 'Sweden', dial_code: '+46', local_name: 'Sverige' },
  { code: 'CH', name: 'Switzerland', dial_code: '+41', local_name: 'Schweiz' },
  { code: 'SR', name: 'Suriname', dial_code: '+597', local_name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', dial_code: '+47', local_name: 'Svalbard og Jan Mayen' },
  { code: 'TH', name: 'Thailand', dial_code: '+66', local_name: 'ประเทศไทย' },
  { code: 'TW', name: 'Taiwan', dial_code: '+886', local_name: '台灣' },
  { code: 'TJ', name: 'Tajikistan', dial_code: '+992', local_name: 'Тоҷикистон' },
  { code: 'TZ', name: 'Tanzania', dial_code: '+255', local_name: 'Tanzania' },
  { code: 'TL', name: 'Timor-Leste', dial_code: '+670', local_name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo', dial_code: '+228', local_name: 'Togo' },
  { code: 'TK', name: 'Tokelau', dial_code: '+690', local_name: 'Tokelau' },
  { code: 'TO', name: 'Tonga', dial_code: '+676', local_name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago', dial_code: '+1868', local_name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia', dial_code: '+216', local_name: 'تونس' },
  { code: 'TM', name: 'Turkmenistan', dial_code: '+993', local_name: 'Türkmenistan' },
  { code: 'TR', name: 'Turkey', dial_code: '+90', local_name: 'Türkiye' },
  { code: 'TV', name: 'Tuvalu', dial_code: '+688', local_name: 'Tuvalu' },
  { code: 'UA', name: 'Ukraine', dial_code: '+380', local_name: 'Україна' },
  { code: 'UG', name: 'Uganda', dial_code: '+256', local_name: 'Uganda' },
  { code: 'UY', name: 'Uruguay', dial_code: '+598', local_name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan', dial_code: '+998', local_name: 'Oʻzbekiston' },
  { code: 'VU', name: 'Vanuatu', dial_code: '+678', local_name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City', dial_code: '+39', local_name: 'Vaticano' },
  { code: 'VE', name: 'Venezuela', dial_code: '+58', local_name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam', dial_code: '+84', local_name: 'Việt Nam' },
  { code: 'VI', name: 'United States Virgin Islands', dial_code: '+1340', local_name: 'United States Virgin Islands' },
  { code: 'VG', name: 'British Virgin Islands', dial_code: '+1284', local_name: 'British Virgin Islands' },
  { code: 'WF', name: 'Wallis and Futuna', dial_code: '+681', local_name: 'Wallis-et-Futuna' },
  { code: 'ZM', name: 'Zambia', dial_code: '+260', local_name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe', dial_code: '+263', local_name: 'Zimbabwe' }
];

// Função auxiliar para obter o código do país a partir do código de discagem
export const getCountryCodeFromDialCode = (dialCode: string): string | undefined => {
  const country = countryCodes.find(c => dialCode.startsWith(c.dial_code));
  return country?.code;
};

// Função auxiliar para formatar números de telefone
export const formatPhoneNumber = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, '');
  
  // Formata o número de acordo com o padrão brasileiro (exemplo)
  if (numericValue.length <= 2) {
    return numericValue;
  } else if (numericValue.length <= 7) {
    return `${numericValue.slice(0, 2)} ${numericValue.slice(2)}`;
  } else if (numericValue.length <= 11) {
    return `${numericValue.slice(0, 2)} ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
  } else {
    return `${numericValue.slice(0, 2)} ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
  }
};

// Função para extrair o código do país e o número de um valor completo
export const extractPhoneComponents = (fullNumber: string): { countryCode: string, phoneNumber: string } => {
  // Valor padrão
  let result = { countryCode: 'BR', phoneNumber: fullNumber };
  
  // Procura por um código de discagem no início do número
  for (const country of countryCodes) {
    if (fullNumber.startsWith(country.dial_code)) {
      result = {
        countryCode: country.code,
        phoneNumber: fullNumber.substring(country.dial_code.length)
      };
      break;
    }
  }
  
  return result;
}; 