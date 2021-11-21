# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  include ActionView::Helpers::TranslationHelper
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  # fixtures :all

  # Add more helper methods to be used by all tests here...
  def headers(user, options = {})
    {
      Accept: "application/json",
      "Content_Type" => "application/json",
      "X-Auth-Token" => user.authentication_token,
      "X-Auth-Email" => user.email
    }.merge(options)
  end
end
