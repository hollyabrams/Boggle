from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle
from flask import json

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_home_page(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Welcome to Boggle!</h1>', html)

    def test_check_word(self):
        with app.test_client() as client:
            client.get('/')
            resp = client.post('/word', data=json.dumps(dict(word='apple')), content_type='application/json')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('result', html)

    def test_user_score(self):
        with app.test_client() as client:
            client.get('/')
            resp = client.post('/score', data=json.dumps(dict(score='1')), content_type='application/json')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('1', html)

    def test_user_score(self):
        with app.test_client() as client:
            client.get('/')
            resp = client.get('/hint')
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('hint_word', html)



