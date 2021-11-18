# frozen_string_literal: true

class AttemptsController < ApplicationController
  def show
    @answer_list = []
    @attempt = Attempt.find_by_id(params[:id])
    quiz = Quiz.find_by_id(@attempt.quiz_id)
    quiz.questions.each do |question|
      correct_option = question.options.find_by(answer: true)
      @answer_list << correct_option
    end
    # @attempt.attempt_answers.each do |attempt_answer_data|
    #   question = Question.find_by_id(attempt_answer_data[:question_id])
    #   correct_option = question.options.find_by(answer: true)
    #   @answer_list << correct_option
    # end
  end
end
