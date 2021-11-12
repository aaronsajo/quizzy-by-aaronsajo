json.question do
  json.extract! @question, :description, :quiz_id
  json.quiz @question.quiz.title
  json.options @question.options do |option|
    json.extract! option, :id, :content, :answer
  end
end
