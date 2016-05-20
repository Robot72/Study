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

-- Модернизация запроса для получения инфы и по путям изображений к флагам
SELECT `id_country`, `key`, `value`, `code`
FROM `country_settings` INNER JOIN `country` 
ON `country_settings`.id_country = `country`.id
WHERE (`key`='phone_code' AND `public`=1) OR (`key`='flag_icon' AND `public`=1)
ORDER BY `country_settings`.id_country;
