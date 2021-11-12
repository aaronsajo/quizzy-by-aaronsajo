# Frozen_string_literal: true

json.quiz do
  json.extract! @quiz, :title
  json.questions @quiz.questions do |question|
    json.extract! question, :id, :description
    json.options question.options do |option|
      json.extract! option, :id, :content, :answer
    end
  end
end
