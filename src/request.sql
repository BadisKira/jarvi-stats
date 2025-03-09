WITH all_data AS (
  SELECT
    type,
    CASE 
      WHEN created_at BETWEEN {{start_date}} AND {{end_date}} THEN 'current'
      WHEN created_at BETWEEN ({{start_date}} - ({{end_date}} - {{start_date}}))
                          AND ({{start_date}} - interval '1 second') THEN 'previous'
    END AS period,
    COUNT(*) AS nombre_messages,
    SUM(CASE WHEN trigger_has_been_replied_to THEN 1 ELSE 0 END) AS nombre_reponses,
    SUM(CASE WHEN is_manually_created THEN 1 ELSE 0 END) AS nombre_manually_created,
    AVG(EXTRACT(EPOCH FROM (event_end_at - event_start_at))) AS temps_moyen
  FROM historyentries
  WHERE created_at BETWEEN ({{start_date}} - ({{end_date}} - {{start_date}})) 
                         AND {{end_date}}  
    AND type = ANY(string_to_array({{message_type}}, ','))  
  GROUP BY type, period
)
SELECT 
  t.type,
  COALESCE(current.nombre_messages, 0) AS nombre_messages_actuel,
  COALESCE(previous.nombre_messages, 0) AS nombre_messages_precedent,
  COALESCE(current.nombre_reponses, 0) AS nombre_reponses_actuel,
  COALESCE(previous.nombre_reponses, 0) AS nombre_reponses_precedent,
  COALESCE(current.nombre_manually_created, 0) AS nombre_manually_created_actuel,
  COALESCE(previous.nombre_manually_created, 0) AS nombre_manually_created_precedent,
  COALESCE(current.temps_moyen, 0) AS temps_moyen_reponse_actuel,
  COALESCE(previous.temps_moyen, 0) AS temps_moyen_reponse_precedent
FROM (
  SELECT unnest(string_to_array({{message_type}}, ',')) AS type
) t
LEFT JOIN all_data current ON t.type = current.type AND current.period = 'current'
LEFT JOIN all_data previous ON t.type = previous.type AND previous.period = 'previous';