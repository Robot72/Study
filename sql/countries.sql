-- Вывод всех строк из таблиц 
SELECT *
    FROM `country_settings`
    INNER JOIN `country` 
    ON `country_settings`.id_country = `country`.id;
    
-- Выборка для списка параметров по странам
SELECT *
    FROM `country_settings`
    INNER JOIN `country` 
    ON `country_settings`.id_country = `country`.id
    ORDER BY `country_settings`.id_country;
    
-- Выборка всех стран с их символьными и телефонными кодами    
SELECT `id_country`, `value`, `code`
FROM `country_settings` INNER JOIN `country` 
ON `country_settings`.id_country = `country`.id
WHERE `key`='phone_code' AND `public`=1;
