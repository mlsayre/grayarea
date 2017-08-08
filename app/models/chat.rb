class Chat < ApplicationRecord
	include ActionView::Helpers::DateHelper

	def self.chattime
    time_ago_in_words(created_at, include_seconds: true)
  end
end
