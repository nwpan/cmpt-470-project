class User < ActiveRecord::Base
    attr_accessible :email, :first_name, :last_name, :password, :password_confirmation, :balance
    has_secure_password

    before_create { |user| user.email = email.downcase }
    before_create :create_remember_token
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
    validates :first_name,  presence: true, length: { maximum: 140 }
    validates :last_name,  presence: true, length: { maximum: 140 }
    validates :password, presence: true, length: { minimum: 6 }, :on => :create
    validates :password_confirmation, presence: true, :on => :create

    has_many :inventory
    has_many :items, :through => :inventory
    def purchase_item(item_id)
        # Check if passed item_id is a valid entry in the items table.
        if !Item.exists?(:id => item_id)
            return false
        end
        item = Item.find(item_id)

        if self.balance >= item.price
            self.balance -= item.price
            self.items << item
            return true
        end
        return false
    end
private
    def create_remember_token
        self.remember_token = SecureRandom.urlsafe_base64
    end
end
