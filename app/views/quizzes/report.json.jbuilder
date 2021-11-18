# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.attempts quiz.attempts do |attempt|
    json.quiz_name quiz.title
    json.name attempt.user.first_name + " " + attempt.user.first_name
    json.user_email attempt.user.email
    json.correct attempt.correct_answer_count
    json.incorrect attempt.incorrect_answer_count
  end
end
