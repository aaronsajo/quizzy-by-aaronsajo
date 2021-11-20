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

  def export
    job_id = ExportReportWorker.perform_async

    render json: {
      jid: job_id
    }
  end

  def export_status
    job_id = params[:id]
    job_status = Sidekiq::Status.get_all(job_id).symbolize_keys
    puts job_status[:status]
    render json: {
      status: job_status[:status],
      percentage: job_status[:pct_complete]
    }
  end

  def export_download
    job_id = params[:id]
    exported_file_name = "report_export_#{job_id}.xlsx"
    filename = "ReportData_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}.xlsx"
    send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
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
