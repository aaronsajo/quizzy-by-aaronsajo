# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform
    sleep 10
    attempts = [["T1", "d2"], ["T2", "D2"]]
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook

    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row %w(ID Name )

      attempts.each.with_index(1) do |attempt, idx|
        worksheet.add_row attempt
        at idx
        sleep 0.5
      end
    end

    xlsx_package.serialize Rails.root.join("tmp", "report_export_#{self.jid}.xlsx")
  end
end
