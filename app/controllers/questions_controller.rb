# frozen_string_literal: true

class QuestionsController < ApplicationController
  def create
    @question = Question.new(question_params)
    unless @question.save
      render sattus :unprocessable_entity,
        json: { error: @question.error.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:question).permit(:description, :quiz_id, options_attributes: [ :content, :answer])
    end
end
