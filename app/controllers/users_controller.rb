# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email].downcase)
    @eligible = true

    if @user

      @attempt = Attempt.find_by(user_id: @user.id, quiz_id: params[:quiz_id])
      if @attempt
        unless !@attempt.submitted
          @eligible = false
        end
      else
        create_attempt
      end
    else
      @user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      if @user.save
        create_attempt
      else
        render status: :unprocessable_entity, json: { error: @user.errors.full_messages.to_sentence }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end

    def create_attempt
      @attempt = @user.attempts.new({ quiz_id: params[:quiz_id] })
      unless @attempt.save
        render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
end
