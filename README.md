Backend routes:

See [https://github.com/wilzbach/mofi/issues/15#issuecomment-346887203]()

Mobile:
- GET /session/:code/next-movie   ->  Movie (only movie_id)
- POST /session/:code/ratings (an array of movie objects, ids, ....)

TV:
- GET /session/new    ->    session's code (do not display code yet)
- POST /session/:code/mood   ->   (should now display code on TV client)
- GET /session/:code/recommendations -> [10 x AggregateMovieRating]