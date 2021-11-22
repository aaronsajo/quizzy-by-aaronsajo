# frozen_string_literal: true

json.userdetails @users do |user|
  json

end

json.attempt do
  json.attempted_answer @attempt.attempt_answers do |attempted_answer_data|
    json.question_id attempted_answer_data.question_id
    json.attempted_answer attempted_answer_data.attempted_answer
  end
  json.correct_answer_list @answer_list
  json.correct_answer_count @attempt.correct_answer_count
  json.incorrect_answer_count @attempt.incorrect_answer_count

end
