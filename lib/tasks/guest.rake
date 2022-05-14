namespace :guest do
  desc "delete guest_user posts"
  task reset_guest: :environment do
    GUEST_USER_ID = 2
    @user = User.find(GUEST_USER_ID)
    @user.favorites.each do |favorite|
      favorite.destroy
    end
    @user.comments.each do |comment|
      comment.destroy
    end
  end
end
