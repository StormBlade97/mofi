Backend routes:

Mobile:
- GET /:code/next-movie -> Movie (only movie_id)
- POST /:code/ratings (an array of movie objects, ids, ....)

TV:
- GET /new-session -> session's code (do not display code yet)
- POST /:code/mood -> (should now display code on TV client)
- GET /:code/recommendations -> [10 x AggregateMovieRating (fields described above)]
