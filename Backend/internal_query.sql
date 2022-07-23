SELECT
  *
FROM
  batting_stats,
  player
WHERE
  batting_stats.player = player.id
  AND batting_stats.id = `id`
UPDATE
  batting_stats
SET
  year = `year`,
  innings = `innings`....WHERE batting_stats.id = `id`
INSERT INTO
  batting_stats (year, innings,....)
VALUES
  (`year`, `innings`....) DELETR
FROM
  batting_stats
WHERE
  id = `id`
SELECT
  *
FROM
  bowling_stats,
  player
WHERE
  bowling_stats.player = player.id
  AND bowling_stats.id = `id`
UPDATE
  bowling_stats
SET
  year = `year`,
  innings = `innings`....WHERE bowling_stats.id = `id`
INSERT INTO
  bowling_stats (year, innings,....)
VALUES
  (`year`, `innings`....) DELETR
FROM
  bowling_stats
WHERE
  id = `id`
SELECT
  *
FROM
  team,
  player
WHERE
  team.members = player.id
SELECT
  *
FROM
  team,
  player
WHERE
  team.members = player.id
  AND team.id = `id`
UPDATE
  team
SET
  name = `name`,
  short_name = `short_name`....WHERE team.id = `id`
INSERT INTO
  team (name, short_name,....)
VALUES
  (`name`, `short_name`....) DELETR
FROM
  team
WHERE
  id = `id`
SELECT
  *
FROM
  player
SELECT
  *
FROM
  player
WHERE
  isCaption = true
SELECT
  *
FROM
  player
WHERE
  team != NULL
SELECT
  *
FROM
  player
WHERE
  name LIKE % `name` %
SELECT
  *
FROM
  team,
  player
WHERE
  team.members = player.id
  AND team.short_name = `short_name`
UPDATE
  player
SET
  name = `name`,
  short_name = `short_name`....WHERE team.id = `id`
INSERT INTO
  player (name, short_name,....)
VALUES
  (`name`, `short_name`....) DELETR
FROM
  player
WHERE
  id = `id`
SELECT
  *
FROM
  team,
  matches
WHERE
  matches.team_a = `id`
  OR matches.team_b = `id`
UPDATE
  team
SET
  team_a_scores = `team_a_scores`,
  session = `session`....WHERE team.id = `id`
INSERT INTO
  team (team_a_scores, session,....)
VALUES
  (`team_a_scores`, `session`....) DELETR
FROM
  team
WHERE
  id = `id`