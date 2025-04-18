import random


def get_user_choice():
    print("Enter your choice: rock, paper, or scissors")
    return input().strip().lower()


def get_computer_choice():
    return random.choice(["rock", "paper", "scissors"])


def determine_winner(user_choice, computer_choice):
    if user_choice == computer_choice:
        return "It's a tie!"
    elif (user_choice == "rock" and computer_choice == "scissors") or \
         (user_choice == "paper" and computer_choice == "rock") or \
         (user_choice == "scissors" and computer_choice == "paper"):
        return "You win!"
    else:
        return "You lose!"


def main():
    while True:
        try:
            rounds = int(input("How many rounds would you like to play? "))
        except ValueError:
            print("Please enter a valid number.")
            continue

        for _ in range(rounds):
            user_choice = get_user_choice()
            computer_choice = get_computer_choice()
            print(f"You chose: {user_choice}")
            print(f"Computer chose: {computer_choice}")
            result = determine_winner(user_choice, computer_choice)
            print(result)

        play_again = input(
            "Do you want to play again? (yes/no): ").strip().lower()
        if play_again != "yes":
            print("Thanks for playing!")
            break


if __name__ == "__main__":
    main()
