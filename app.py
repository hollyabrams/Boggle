from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension


from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'topsecret'
app.debug = True
DebugToolbarExtension(app)

@app.route('/')
def home():
    letters_board = boggle_game.make_board()
    session['board'] = letters_board

    if not session.get('user_score'):
        session['user_score'] = 0
    if not session.get('game_count'):
        session['game_count'] = 1
    else: 
        game = int(session['game_count'])
        game += 1
        session['game_count'] = game
    
    session['trace_words'] = []

    return render_template('index.html', letters_board = letters_board)

@app.route('/word', methods = ['POST'])
def check_word():
    word_request = request.get_json()
    word = word_request['word']
    list_of_words = session.get('trace_words', [])

    if word.lower() in list_of_words:
        response = jsonify(result='The same word is not allowed!')
    else:
        letters_board = session['board']
        result_word = boggle_game.check_valid_word(letters_board, word)
        if result_word == 'ok':
            list_of_words.append(word.lower())
            session['trace_words'] = list_of_words
        
    response = jsonify(result=result_word)
    return response

@app.route('/score', methods=['POST'])
def user_score():
    score_request = request.get_json()

    '''
    import pdb
    pdb.set_trace()
    '''

    user_score = int(session['user_score'])
    user_score += int(score_request['score'])
    session['user_score'] = user_score
    return jsonify(score = user_score)

@app.route('/hint')
def get_hint():
    letters_board = session['board']
    list_of_words = session['trace_words']
    result = boggle_game.hint(letters_board, list_of_words)
    return jsonify(hint_word=result)
