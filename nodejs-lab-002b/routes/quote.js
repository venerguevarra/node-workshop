import { Router } from 'express';
import uuidv4 from 'uuid/v4';

const router = Router();

router.get('/', (req, res) => {
  let quotes = req.context.models.quotes;

  if(req.query.year) {
    let filteredQuotes = quotes.filter((q) => q.year == req.query.year);
    if(filteredQuotes && filteredQuotes.length) {
      res.json(filteredQuotes);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.status(200).json(quotes);
  }
});

router.get('/:id', (req, res) => {
  let quote = req.context.models.quotes.find((q)=> q.id == req.params.id);
  if(quote) {
    res.status(200).json(quote);
  } else {
    res.status(404).json({ message: 'resource not found' });
  }
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const quote = {
    id,
    quote: req.body.quote,
    author: req.body.author,
    year: req.body.year,
  };

  req.context.models.quotes.push(quote);

  return res.status(201).json(quote);
});

export default router;