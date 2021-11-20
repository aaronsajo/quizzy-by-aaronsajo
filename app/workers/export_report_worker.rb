# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform(current_user_id)
    sleep 8
    @attempts = []
    @current_user = User.find_by_id(current_user_id)
    @current_user.quizzes.each do |quiz|
      @attempts.push(*quiz.attempts.where(submitted: true))
    end
    total @attempts.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook

    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row %w(Quiz UserName Email Correct Incorrect )

      @attempts.each.with_index(1) do |attempt, idx|
        worksheet.add_row [attempt.quiz.title, "#{attempt.user.first_name} #{attempt.user.first_name}",
        attempt.user.email, attempt.correct_answer_count, attempt.incorrect_answer_count]
        at idx
        sleep 0.5
      end
    end

    xlsx_package.serialize Rails.root.join("tmp", "report_export_#{self.jid}.xlsx")
  end
end
