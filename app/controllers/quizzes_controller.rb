# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :check_slug
  before_action :load_quiz, only: [:destroy, :show, :update, :set_slug]
  def index
    @quizzes = @current_user.quizzes.order("created_at Desc")
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Quiz") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def show
    render
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Quiz") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def set_slug
    title_slug = @quiz.title.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_quiz_slug = Quiz.where(
      regex_pattern,
      "#{title_slug}$|#{title_slug}-[0-9]+$"
    ).order(slug: :desc).first&.slug
    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
    @quiz.update(slug: slug)
  end

  def check_slug
    quiz_slug = Quiz.find_by(slug: params[:slug])
    if quiz_slug
      @id = quiz_slug ? quiz_slug.id : nil
      @title = quiz_slug ? quiz_slug.title : nil
    else
      render status: :unprocessable_entity,
        json: { error: t("not_found", entity: "Quiz") }
    end
  end

  def report
    @quizzes = @current_user.quizzes
  end

  private

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def quiz_params
      params.require(:quiz).permit(:title)
    end
end
