# frozen_string_literal: true

json.questions @quiz.questions do |question|
  json.extract! question, :id, :description
  json.options question.options do |option|
    json.extract! option, :id, :content
  end
end
